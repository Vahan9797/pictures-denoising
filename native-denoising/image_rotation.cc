#include <node.h>
#include <opencv2/opencv.hpp>
#include <iostream>

namespace image_rotation {
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
	using cv::Point2f;
	using cv::getRotationMatrix2D;
	using cv::Rect2f;
	using cv::RotatedRect;
	using cv::warpAffine;

	string V8_TO_C_STR(const String::Utf8Value& value) {
		return *value ? *value : "<string conversion failed>";
	}

	bool validateArguments(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		if(args.Length() < 3) {
			isolate->ThrowException(Exception::Error(String::NewFromUtf8(isolate, "Wrong number of arguments.")));
			return false;
		}
		if(!args[0]->IsString() || !args[1]->IsString() || !args[2]->IsNumber()) {
			isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, "Wrong argument types.")));
			return false;
		}

		return true;
	}

	/** 
		function rotateImage:
			arguments:
				args[0] -> image source(string);
				args[1] -> image destination(string);
				args[2] -> angle(int);
			return value:
				destination where rotated file has been written

		P.S. function body is mainly from Stack Overflow, so any problem you should blame the person who wrote it ;)
	*/

	void rotateImage(const FunctionCallbackInfo<Value>& args) {
		if(validateArguments(args)) {
			Isolate* isolate = args.GetIsolate();
			String::Utf8Value arg0(args[0]);
			String::Utf8Value arg1(args[1]);

			Mat src = imread(V8_TO_C_STR(arg0), CV_LOAD_IMAGE_UNCHANGED);
		    double angle = args[2]->NumberValue();

		    // get rotation matrix for rotating the image around its center in pixel coordinates
		    Point2f center((src.cols-1)/2.0, (src.rows-1)/2.0);
		    Mat rot = getRotationMatrix2D(center, angle, 1.0);
		    // determine bounding rectangle, center not relevant
		    Rect2f bbox = RotatedRect(Point2f(), src.size(), angle).boundingRect2f();
		    // adjust transformation matrix
		    rot.at<double>(0,2) += bbox.width/2.0 - src.cols/2.0;
		    rot.at<double>(1,2) += bbox.height/2.0 - src.rows/2.0;

		    Mat dst;
		    warpAffine(src, dst, rot, bbox.size());
		    imwrite(V8_TO_C_STR(arg1), dst);
		    args.GetReturnValue().Set(String::NewFromUtf8(isolate, *arg1));
		}
	}

	void Init(Local<Object> exports) {
		NODE_SET_METHOD(exports, "rotateImage", rotateImage);
	}

	NODE_MODULE(NODE_GYP_MODULE_NAME, Init);
}