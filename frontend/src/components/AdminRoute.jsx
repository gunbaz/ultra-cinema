import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Yükleniyor...</div>;
    }

    // Kullanıcı giriş yapmamışsa Login'e yönlendir
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    // Admin yetkisi kontrolü - KESİN GÜVENLİK
    // Rol Standartları:
    // role_id = 1 = Super Admin (Sadece veritabanından elle atanır)
    // role_id = 2 = Müşteri (Varsayılan kayıt rolü)
    // Sadece role_id === 1 olanlar geçebilir
    const isSuperAdmin = Number(user.role_id) === 1;

    if (!isSuperAdmin) {
        // Müşteri veya yetkisiz kullanıcı -> Ana sayfaya yönlendir ve uyarı ver
        alert('Bu sayfaya erişim yetkiniz yok!');
        return <Navigate to="/" replace />;
    }

    // Super Admin yetkisi varsa sayfayı göster
    return children;
}

