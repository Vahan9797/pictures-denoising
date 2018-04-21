{
  "targets": [
    {
      "target_name": "native_denoiser",
      "sources": [ "backend-implementation/native-denoising/denoising.cc" ],
      "cflags_cc!": [ '-fno-rtti', '-fno-exceptions' ],
      "include_dirs": [ "/usr/include/opencv, /usr/include/opencv2" ],
      "libraries": [ "/usr/lib/libopencv_core.so" ]
    }
  ]
}