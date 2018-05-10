{
  "targets": [
    {
      "target_name": "denoiser",
      "sources": [ "native-denoising/denoising.cc" ],
      "cflags_cc!": [ "-fno-rtti", "-fno-exceptions", "-lopencv_imgcodecs" ],
      "include_dirs": [ "/usr/local/include/opencv, /usr/local/include/opencv2" ],
      "libraries": [
        "/usr/local/lib/libopencv_core.so",
        "/usr/local/lib/libopencv_highgui.so",
        "/usr/local/lib/libopencv_imgproc.so",
        "/usr/local/lib/libopencv_imgcodecs.so",
        "/usr/local/lib/libopencv_photo.so"
      ]
    }
  ]
}