// 1. Import Supabase ala Pro Developer (Narik dari node_modules)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sxjfomlgjukxviqklope.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4amZvbWxnanVreHZpcWtsb3BlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQwNzE2NTUsImV4cCI6MjA5OTY0NzY1NX0.ywIVQR3erZwfhsQJccJRajtoq0oWBr8wtu495eVzvlw';

// Panggil fungsinya langsung
const supabase = createClient(supabaseUrl, supabaseKey);


// --- FITUR PREVIEW NAMA FILE LOGO ---
const logoInput = document.getElementById('clubLogo');
const fileNameDisplay = document.getElementById('fileNameDisplay');

logoInput.addEventListener('change', function(e) {
  if (e.target.files.length > 0) {
    // Ambil nama file yang dipilih
    const fileName = e.target.files[0].name;
    // Ubah teks di dalam kotak menjadi nama file
    fileNameDisplay.textContent = fileName;
    // Ubah warna teks jadi hijau (success)
    fileNameDisplay.classList.remove('text-slate-200');
    fileNameDisplay.classList.add('text-emerald-400', 'animate-pulse');
  } else {
    // Kalau batal pilih file, kembalikan ke teks semula
    fileNameDisplay.textContent = 'Drag & Drop atau Klik';
    fileNameDisplay.classList.remove('text-emerald-400', 'animate-pulse');
    fileNameDisplay.classList.add('text-slate-200');
  }
});
// ------------------------------------


// --- FITUR SUBMIT FORM KE SUPABASE ---
const form = document.getElementById('onboarding-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 

  // Ambil data yang diketik di form
  const clubName = document.getElementById('clubName').value;
  const headCoach = document.getElementById('headCoach').value;
  const location = document.getElementById('poolLocation').value;

  // Bikin tombolnya jadi mode loading
  const btn = form.querySelector('button');
  const btnTextAsli = btn.innerHTML;
  btn.innerHTML = 'Membangun Sistem...';
  btn.disabled = true;

  // Tembak data ke database!
  const { data, error } = await supabase
    .from('clubs')
    .insert([
      { 
        club_name: clubName, 
        head_coach: headCoach, 
        location: location 
      }
    ]);

  if (error) {
    alert('Waduh gagal bro: ' + error.message);
    btn.innerHTML = btnTextAsli;
    btn.disabled = false;
  } else {
    // KITA UBAH BAGIAN INI: Hapus alert, ganti tulisan tombolnya
    btn.innerHTML = 'Berhasil! Mengalihkan...';
    
    // Kasih jeda setengah detik, lalu paksa pindah pakai origin
    setTimeout(() => {
      // Ini jalur paksa biar browser nggak peduli sama tanda /? yang nyangkut
      window.location.replace(window.location.origin + '/dashboard.html');
    }, 500);
  }
});
// ------------------------------------
