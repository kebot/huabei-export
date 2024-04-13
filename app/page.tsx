import { DownloadForm } from "./DownloadForm"

function Footer() {
  return (
    <div className='text-center w-full'>
      Copyright © 2015-2023 柏林没雪科技有限公司
      <br />
      <div className='flex justify-center content-center leading-[32px]'>
        <img
          src='https://www.berlin.de/imgscaler/6eTJR9uvShzJ6CWCNt8j7VNMegjwhrr7BBWFhUCFTZM/r2zu1/L3N5czExLXByb2QvcG9saXplaS9fYXNzZXRzL3dvcnRiaWxkbWFya2UucG5n.png?ts=1701355349'
          alt='Berlin'
          height={32}
          width={64}
        />
        <div>柏公网安备 11010502038964 号</div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className='container mx-auto'>
      <p>
        使用方法, <br />
        1.
        打开滑呗进入我的动态选择需要导出的滑雪行程,进入轨迹详情,然后点击分享,选择链接分享,默认好像只支持分享到微信微博之类的,可以选择微信发给文件转发助手(或者朋友)
        <br />
        2. 接着前往微信打开方才分享的链接,点右上角的点点点拷贝链接(你会得到一个类似:
        https://h5.fenxuekeji.com/h5/mogul_react/track?track_id=xxxxxxxx-1edf-4756-8d62-082e13f487ea&from_share=1&current_user_uuid=xxxx)
        的链接, 把它填入下面的输入框里面:
        <br />
      </p>

      <DownloadForm />

      <hr className='mt-80' />

      <Footer></Footer>
    </div>
  )
}
