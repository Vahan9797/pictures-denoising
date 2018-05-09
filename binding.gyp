{
  "targets": [
    {
      "target_name": "denoiser",
      "sources": [ "native-denoising/denoising.cc" ],
      "cflags_cc!": [ "-fno-rtti", "-fno-exceptions", "-lopencv_imgcodecs" ],
      "include_dirs": [ "/usr/include/opencv, /usr/include/opencv2" ],
      "libraries": [
        "/usr/lib/libopencv_core.so",
        "/usr/lib/libopencv_highgui.so",
        "/usr/lib/libopencv_imgproc.so",
        "/usr/lib/libopencv_imgcodecs.so",
        "/usr/lib/libopencv_photo.so"
      ]
    }
  ]
}