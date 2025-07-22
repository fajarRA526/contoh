// Basis Pengetahuan: [penyakit, gejala, MB, MD]
const pengetahuan = [
  ["Flu", "Demam", 0.7, 0.1],
  ["Flu", "Batuk", 0.6, 0.2],
  ["Flu", "Pilek", 0.8, 0.1],
  ["Demam Berdarah", "Demam", 0.9, 0.1],
  ["Demam Berdarah", "Sakit Kepala", 0.8, 0.2],
  ["Demam Berdarah", "Nyeri Otot", 0.9, 0.2],
  ["Keracunan", "Mual", 0.7, 0.1],
  ["Keracunan", "Demam", 0.6, 0.2],
  ["Anemia", "Lemas", 0.8, 0.1],
  ["Anemia", "Sakit Kepala", 0.7, 0.2]
];

document.getElementById('formGejala').addEventListener('submit', function(e) {
  e.preventDefault();
  const dipilih = Array.from(document.querySelectorAll('input[name="gejala"]:checked')).map(x => x.value);
  localStorage.setItem("gejalaDipilih", JSON.stringify(dipilih));
  window.location.href = "hasil.html";
});

