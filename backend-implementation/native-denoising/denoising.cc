#include <node.h>
#include <opencv2/opencv.hpp>

namespace denoiser {
	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::Object;
	using v8::String;
	using v8::Value;
	using cv::Mat;
	using cv::imread;
	using cv::fastNlMeansDenoising;
	using cv::fastNlMeansDenoisingColored;

	void Method(const FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = args.GetIsolate();
		args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));
	}

	void init(Local<Object> exports) {
		NODE_SET_METHOD(exports, "hello", Method);
	}

	NODE_MODULE(NODE_GYP_MODULE_NAME, init)
} // namespace denoiser