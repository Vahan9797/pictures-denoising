#include <node.h>
#include <opencv2/opencv.hpp>

namespace denoiser {
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
	using cv::fastNlMeansDenoising;
	using cv::fastNlMeansDenoisingMulti;
	using cv::fastNlMeansDenoisingColored;
	using cv::fastNlMeansDenoisingColoredMulti;

	bool validateArguments(const FunctionCallbackInfo<Value>& args, bool isMultiDenoising = false) {
		Isolate* isolate = args.GetIsolate();
		if(args.Length() < 2) {
			isolate->ThrowException(Exception::Error(String::NewFromUtf8(isolate, "Wrong number of arguments")));
			return false;
		}
		if(isMultiDenoising && !args[0]->IsArray() || !args[0]->IsString() || !args[1]->IsString()) {
			isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong arguments")));
			return false;
		}

		return true;
	}

	void singleDenoisingGrayscale(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args)) {
			Isolate* isolate = args.GetIsolate();
			Mat img = imread(args[0]->ToString());
			fastNlMeansDenoising(img, args[1]->ToString(), 3, 3, 7, 21);
			args.GetReturnValue().Set(String::NewFromUtf8(isolate, args[1]->ToString()));
		};
	}

	void singleDenoisingColored(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args)) {
			Isolate* isolate = args.GetIsolate();
			Mat img = imread(args[0]->ToString());
			fastNlMeansDenoisingColored(img, args[1]->ToString(), 3, 3, 7, 21);
			args.GetReturnValue().Set(String::NewFromUtf8(isolate, args[1]->ToString()));
		}
	}

	void multiDenoisingGrayscale(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args, true)) {
			Isolate* isolate = args.GetIsolate();
			const int length = args[0]->length;
			Mat* imgArr = Mat[length];
			for(int i = 0; i < length; i++) {
				imgArr[i] = imread(args[0][i]->ToString());
			}

			fastNlMeansDenoisingMulti(imgArr, args[1]->ToString(), 3, 3, 7, 21);
			args.GetReturnValue().Set(String::NewFromUtf8(isolate, args[1]->ToString()));
		}
	}

	void multiDenoisingColored(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args, true)) {
			Isolate* isolate = args.GetIsolate();
			const int length = isolate->images.length;
			Mat* imgArr = Mat[length];
			for(int i = 0; i < length; i++) {
				imgArr[i] = imread(args[0][i]->ToString());
			}

			fastNlMeansDenoisingColoredMulti(imgArr, args[1]->ToString(), 3, 3, 7, 21);
			args.GetReturnValue().Set(String::NewFromUtf8(isolate, args[1]->ToString()));
		}
	}

	void hasImageColors(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		if(!args[0]->IsString()) {
			isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "hasImageColors: Your argument is not a string")));
			return;
		} else {
			args.GetReturnValue().Set(Boolean::New(isolate, imread(args[0]->ToString()).channels() == 3));
		}
	}

	void Init(Local<Object> exports) {
		NODE_SET_METHOD(exports, "singleDenoisingGrayscale", singleDenoisingGrayscale);
		NODE_SET_METHOD(exports, "singleDenoisingColored", singleDenoisingColored);
		NODE_SET_METHOD(exports, "multiDenoisingGrayscale", multiDenoisingGrayscale);
		NODE_SET_METHOD(exports, "multiDenoisingColored", multiDenoisingColored);
		NODE_SET_METHOD(exports, "hasImageColors", hasImageColors);
	}

	NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
} // namespace denoiser