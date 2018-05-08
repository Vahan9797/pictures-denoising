#include <node.h>
#include <opencv2/opencv.hpp>
#include <iostream>

namespace denoiser {
	using std::string;
	using v8::FunctionCallbackInfo;
	using v8::Exception;
	using v8::Isolate;
	using v8::Local;
	using v8::Object;
	using v8::String;
	using v8::Boolean;
	using v8::Value;
	using cv::Mat;
	using cv::imread;
	using cv::imwrite;
	using cv::fastNlMeansDenoising;
	using cv::fastNlMeansDenoisingMulti;
	using cv::fastNlMeansDenoisingColored;
	using cv::fastNlMeansDenoisingColoredMulti;

	string V8_TO_C_STR(const String::Utf8Value& value) {
		return *value ? *value : "<string conversion failed>";
	}

	bool validateArguments(const FunctionCallbackInfo<Value>& args, bool isMultiDenoising = false) {
		Isolate* isolate = args.GetIsolate();
		if(args.Length() < 2) {
			isolate->ThrowException(Exception::Error(String::NewFromUtf8(isolate, "Wrong number of arguments")));
			return false;
		}
		if((isMultiDenoising && !args[0]->IsArray()) || !args[0]->IsString() || !args[1]->IsString()) {
			isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
			return false;
		}

		return true;
	}

	void singleDenoisingGrayscale(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args)) {
			Isolate* isolate = args.GetIsolate();
			String::Utf8Value arg0(args[0]);
			String::Utf8Value arg1(args[1]);
			Mat img = imread(V8_TO_C_STR(arg0)), denoised_img;
			fastNlMeansDenoising(img, denoised_img, 30.0, 7, 21);
			imwrite(V8_TO_C_STR(arg1), denoised_img);
			args.GetReturnValue().Set(String::NewFromUtf8(isolate, *arg1));
		};
	}

	void singleDenoisingColored(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args)) {
			Isolate* isolate = args.GetIsolate();
			String::Utf8Value arg0(args[0]);
			String::Utf8Value arg1(args[1]);
			Mat img = imread(V8_TO_C_STR(arg0)), denoised_img;
			fastNlMeansDenoisingColored(img, denoised_img, 30.0, 7, 21);
			imwrite(V8_TO_C_STR(arg1), denoised_img);
			args.GetReturnValue().Set(String::NewFromUtf8(isolate, *arg1));
		}
	}

/*	void multiDenoisingGrayscale(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args, true)) {
			Isolate* isolate = args.GetIsolate();
			const int length = args[0]->length;
			Mat* imgArr = new Mat[length];
			Mat* denoisedImgArr = new Mat[length];
			for(int i = 0; i < length; i++) {
				String::Utf8Value argi(args[0]->Arguments(i)->);
				imgArr[i] = imread(V8_TO_C_STR(argi));
			}

			String::Utf8Value arg1(args[1]);
			fastNlMeansDenoisingMulti(imgArr, denoisedImgArr, 30.0, 7, 21);

			for(int i = 0; i < length; i++) {
				imwrite(V8_TO_C_STR(arg1), denoisedImgArr[i]);
			}
			args.GetReturnValue().Set(String::NewFromUtf8(isolate, *arg1));
		}
	}

	void multiDenoisingColored(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args, true)) {
			Isolate* isolate = args.GetIsolate();
			const int length = args[0]->length;
			Mat* imgArr = new Mat[length];
			Mat* denoisedImgArr = new Mat[length];
			for(int i = 0; i < length; i++) {
				String::Utf8Value argi(args[0][i]);
				imgArr[i] = imread(V8_TO_C_STR(argi));
			}

			String::Utf8Value arg1(args[1]);
			fastNlMeansDenoisingColoredMulti(imgArr, denoisedImgArr, 30.0, 7, 21);

			for(int i = 0; i < length; i++) {
				imwrite(V8_TO_C_STR(arg1), denoisedImgArr[i]);
			}
			args.GetReturnValue().Set(String::NewFromUtf8(isolate, *arg1));
		}
	}*/

	void hasImageColors(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		if(!args[0]->IsString()) {
			isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "hasImageColors: Your argument is not a string")));
			return;
		} else {
			String::Utf8Value arg0(args[0]);
			args.GetReturnValue().Set(Boolean::New(isolate, imread(V8_TO_C_STR(arg0)).channels() == 3));
		}
	}

	void Init(Local<Object> exports) {
		NODE_SET_METHOD(exports, "singleDenoisingGrayscale", singleDenoisingGrayscale);
		NODE_SET_METHOD(exports, "singleDenoisingColored", singleDenoisingColored);
/*		NODE_SET_METHOD(exports, "multiDenoisingGrayscale", multiDenoisingGrayscale);
		NODE_SET_METHOD(exports, "multiDenoisingColored", multiDenoisingColored);*/
		NODE_SET_METHOD(exports, "hasImageColors", hasImageColors);
	}

	NODE_MODULE(NODE_GYP_MODULE_NAME, Init);
} // namespace denoiser