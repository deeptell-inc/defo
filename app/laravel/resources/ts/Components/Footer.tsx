import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white mt-12 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">五次元について</h3>
            <p className="text-gray-600">
              株式会社五次元は、アライアンス事業を展開している企業です。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <span
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-primary cursor-pointer"
                >
                  ホーム
                </span>
              </li>
              <li>
                <a
                  href="https://www.gozigen.com/wp/company"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary"
                >
                  会社概要
                </a>
              </li>
              <li>
                <a
                  href="https://www.gozigen.com/wp/compliance/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary"
                >
                  利用規約
                </a>
              </li>
              <li>
                <a
                  href="https://www.gozigen.com/wp/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary"
                >
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <span
                  onClick={() => navigate('/admin')}
                  className="text-gray-600 hover:text-primary cursor-pointer"
                >
                  管理者はこちら
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate('/survey/fp')}
                  className="text-gray-600 hover:text-primary cursor-pointer"
                >
                  FPはこちら
                </span>
              </li>
              <li>
                <span
                  onClick={() => navigate('/merchant')}
                  className="text-gray-600 hover:text-primary cursor-pointer"
                >
                  加盟店はこちら
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">お問い合わせ</h3>
            <p className="text-gray-600">
              お問い合わせは下記フォームよりお願いいたします。
            </p>
            <a
              href="https://www.gozigen.com/wp/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              お問い合わせフォーム
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>© 2024 Gozigen Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
