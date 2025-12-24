    // Bu fonksiyonu Admin.jsx'teki eski handleBackup ile DEĞİŞTİR (satır 95-106 arası)
    
    const handleBackup = async () => {
        setBackupLoading(true);
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/admin/backup`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            if (!response.ok) {
                throw new Error('Yedekleme başarısız');
            }
            
            // Dosyayı blob olarak al
            const blob = await response.blob();
            
            // İndirme linki oluştur
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            
            // Dosya adını header'dan al veya varsayılan kullan
            const contentDisposition = response.headers.get('Content-Disposition');
            let fileName = 'backup.sql';
            if (contentDisposition) {
                const match = contentDisposition.match(/filename="(.+)"/);
                if (match) fileName = match[1];
            }
            
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            
            // Temizlik
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            alert('✅ Yedekleme başarıyla indirildi!');
        } catch (err) {
            alert('❌ Yedekleme Hatası: ' + err.message);
        } finally {
            setBackupLoading(false);
        }
    };
