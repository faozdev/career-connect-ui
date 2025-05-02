// src/app/page.tsx
import Link from 'next/link';
import { FaSearch, FaUserTie, FaFileAlt, FaRobot, FaChartLine } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-800 to-blue-600 text-white">
      {/* Floating Nav */}
      <nav className="fixed top-6 left-0 right-0 z-50 px-6 md:px-12">
        <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-full py-3 px-6 flex justify-between items-center border border-white/20">
          <div className="text-xl font-bold">CareerConnect<span className="text-yellow-400">.AI</span></div>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-yellow-400 transition">Giriş</Link>
            <Link href="/register" className="bg-yellow-400 text-indigo-900 px-5 py-1 rounded-full font-medium hover:bg-yellow-300 transition">Kayıt Ol</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Asymmetric Design */}
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-40 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto pt-36 pb-24 px-6 md:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Yapay Zeka</span> ile
                <br />CV Eşleştirme
              </h1>
              <p className="text-xl text-blue-100 mt-6 max-w-lg">
                Doğru iş ilanları ve yetenekleri yapay zeka ile buluşturan yeni nesil platformumuzla tanışın
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link 
                  href="/register?type=jobseeker" 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-indigo-900 font-semibold px-8 py-3 rounded-full hover:from-yellow-300 hover:to-yellow-200 transition duration-300 shadow-lg shadow-yellow-500/20"
                >
                  İş Arayan Olarak Başla
                </Link>
                <Link 
                  href="/register?type=employer" 
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/20 transition duration-300"
                >
                  İşveren Olarak Başla
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              {/* 3D Floating Elements */}
              <div className="relative h-96 w-full">
                <div className="absolute top-0 left-10 w-64 h-64 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 rotate-6 shadow-xl animate-float-slow">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400 mb-4 flex items-center justify-center">
                    <FaUserTie className="text-indigo-900 text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">İş Profili</h3>
                  <p className="text-blue-100 text-sm">Deneyim: 5+ Yıl</p>
                  <div className="mt-4 bg-white/10 h-2 rounded-full">
                    <div className="bg-yellow-400 h-2 rounded-full w-4/5"></div>
                  </div>
                  <p className="text-xs text-blue-200 mt-1">80% Eşleşme</p>
                </div>
                <div className="absolute bottom-0 right-10 w-72 h-64 bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 -rotate-3 shadow-xl animate-float-normal">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-400 flex items-center justify-center">
                      <FaFileAlt className="text-white text-lg" />
                    </div>
                    <span className="text-yellow-400 font-semibold">CV Analizi</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="bg-blue-400 h-2 rounded-full w-5/6"></div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="bg-yellow-400 h-2 rounded-full w-2/3"></div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full">
                      <div className="bg-purple-400 h-2 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-blue-100">25 İş İlanı ile Eşleşti</p>
                  </div>
                </div>
                <div className="absolute top-24 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-yellow-400/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center animate-float-fast">
                  <FaRobot className="text-4xl text-yellow-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Gradient Cards */}
      <div className="relative py-20 bg-blue-900/50">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl"></div>
              <h3 className="text-4xl font-bold text-yellow-400">5K+</h3>
              <p className="text-blue-200 mt-2">İş İlanı</p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-400/10 rounded-full blur-2xl"></div>
              <h3 className="text-4xl font-bold text-blue-400">15K+</h3>
              <p className="text-blue-200 mt-2">Başarılı Eşleşme</p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl"></div>
              <h3 className="text-4xl font-bold text-purple-400">8K+</h3>
              <p className="text-blue-200 mt-2">CV Yüklendi</p>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-green-400/10 rounded-full blur-2xl"></div>
              <h3 className="text-4xl font-bold text-green-400">97%</h3>
              <p className="text-blue-200 mt-2">Memnuniyet</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works - Interactive Steps */}
      <div className="py-24 relative">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Nasıl</span> Çalışır?
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Step 1 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group md:w-1/3">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-300 w-12 h-12 rounded-full flex items-center justify-center text-indigo-900 font-bold mb-4 group-hover:scale-110 transition-transform duration-300">1</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors duration-300">CV Yükle veya İlan Oluştur</h3>
              <p className="text-blue-200">CV'nizi yükleyin veya işveren olarak iş ilanınızı detaylı bir şekilde oluşturun. AI sistemimiz hemen analiz etmeye başlayacak.</p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300 group md:w-1/3">
              <div className="bg-gradient-to-br from-blue-400 to-blue-300 w-12 h-12 rounded-full flex items-center justify-center text-indigo-900 font-bold mb-4 group-hover:scale-110 transition-transform duration-300">2</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300">AI Analizi ve Eşleştirme</h3>
              <p className="text-blue-200">Yapay zeka teknolojimiz becerileri, deneyimleri ve gereksinimleri analiz ederek en uygun eşleşmeleri belirler.</p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300 group md:w-1/3">
              <div className="bg-gradient-to-br from-purple-400 to-purple-300 w-12 h-12 rounded-full flex items-center justify-center text-indigo-900 font-bold mb-4 group-hover:scale-110 transition-transform duration-300">3</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300">Sonuçları Görüntüle ve İletişime Geç</h3>
              <p className="text-blue-200">En iyi eşleşmelerinizi görün ve platform üzerinden doğrudan iletişime geçerek süreci hızlandırın.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features with Animated Cards */}
      <div className="py-24 bg-gradient-to-b from-blue-900/50 to-indigo-900/70 relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Özellikler</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-300"></div>
              <div className="p-6">
                <div className="text-yellow-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaRobot className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Destekli CV Analizi</h3>
                <p className="text-blue-200">CV'nizdeki becerileri, deneyimleri ve yetkinlikleri otomatik olarak tanımlayarak kategorize eder.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-blue-400/10 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-300"></div>
              <div className="p-6">
                <div className="text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaSearch className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-3">Akıllı Eşleştirme</h3>
                <p className="text-blue-200">Sadece anahtar kelimelere değil, bağlama ve anlama dayalı eşleştirme sistemi.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-purple-400/10 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-purple-300"></div>
              <div className="p-6">
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FaChartLine className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-bold mb-3">Detaylı Analitik</h3>
                <p className="text-blue-200">Başvurularınızın ve eşleşmelerinizin performansını görsel grafiklerle takip edin.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-green-400/10 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-300"></div>
              <div className="p-6">
                <div className="text-green-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.352-.035-.696-.1-1.028A5 5 0 0010 7z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Güvenli İletişim</h3>
                <p className="text-blue-200">Platform üzerinden güvenli ve kolay iletişim kurma imkanı.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-red-400/10 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-red-400 to-red-300"></div>
              <div className="p-6">
                <div className="text-red-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Veri Güvenliği</h3>
                <p className="text-blue-200">CV'leriniz ve şirket verileriniz en yüksek güvenlik standartlarıyla korunur.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-pink-400/10 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-pink-400 to-pink-300"></div>
              <div className="p-6">
                <div className="text-pink-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Mobil Erişim</h3>
                <p className="text-blue-200">Dilediğiniz yerden ve cihazdan platforma erişim sağlayın.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Floating Elements */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Abstract Shapes */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-0 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            {/* Decorative Circle */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-yellow-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 relative">
              Hemen <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Başlayın</span>
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              İster kariyer fırsatları arıyor olun, ister ideal adayları bulmak istiyor olun - AI destekli platformumuz size zaman kazandırır.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/login" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-300 text-indigo-900 font-semibold px-8 py-3 rounded-full hover:from-yellow-300 hover:to-yellow-200 transition duration-300 shadow-lg shadow-yellow-500/20"
              >
                Giriş Yap
              </Link>
              <Link 
                href="/register" 
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/20 transition duration-300"
              >
                Kayıt Ol
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-950/80 backdrop-blur-md border-t border-white/10 py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">CareerConnect<span className="text-yellow-400">.AI</span></div>
              <p className="text-blue-300">
                Yapay zeka destekli CV eşleştirme platformu ile kariyerinizi ve işe alım süreçlerinizi dönüştürün.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Platform</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-blue-300 hover:text-yellow-400 transition">Özellikler</Link></li>
                <li><Link href="/about" className="text-blue-300 hover:text-yellow-400 transition">Hakkımızda</Link></li>
                <li><Link href="/pricing" className="text-blue-300 hover:text-yellow-400 transition">Fiyatlandırma</Link></li>
                <li><Link href="/blog" className="text-blue-300 hover:text-yellow-400 transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">Destek</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-blue-300 hover:text-yellow-400 transition">Yardım Merkezi</Link></li>
                <li><Link href="/faq" className="text-blue-300 hover:text-yellow-400 transition">Sık Sorulan Sorular</Link></li>
                <li><Link href="/contact" className="text-blue-300 hover:text-yellow-400 transition">İletişim</Link></li>
                <li><Link href="/terms" className="text-blue-300 hover:text-yellow-400 transition">Kullanım Şartları</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-400">İletişim</h3>
              <p className="text-blue-300 mb-2">info@CareerConnectai.com</p>
              <p className="text-blue-300">+90 (212) 123 45 67</p>
              <div className="mt-4 flex space-x-4">
                {/* Social Media Links */}
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-300 hover:text-yellow-400 hover:bg-white/20 transition-all">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-300 hover:text-yellow-400 hover:bg-white/20 transition-all">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-blue-300 hover:text-yellow-400 hover:bg-white/20 transition-all">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-blue-300 text-sm">
            <p>&copy; {new Date().getFullYear()} CareerConnect.AI. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}