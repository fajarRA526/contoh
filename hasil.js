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

const hasil = document.getElementById('hasil');
const dipilih = JSON.parse(localStorage.getItem("gejalaDipilih")) || [];

if (dipilih.length === 0) {
  hasil.innerHTML = "<p><em>Tidak ada gejala yang dipilih.</em></p>";
} else {
  const hasilCF = {};

  pengetahuan.forEach(item => {
    const [penyakit, gejala, mb, md] = item;
    if (dipilih.includes(gejala)) {
      if (!hasilCF[penyakit]) hasilCF[penyakit] = [];
      hasilCF[penyakit].push({ mb, md });
    }
  });

  const ranking = [];

  for (let penyakit in hasilCF) {
    let data = hasilCF[penyakit];
    let mb = data[0].mb;
    let md = data[0].md;
    for (let i = 1; i < data.length; i++) {
      mb = mb + data[i].mb * (1 - mb);
      md = md + data[i].md * (1 - md);
    }
    const cf = (mb - md).toFixed(4);
    ranking.push({ penyakit, cf: parseFloat(cf) });
  }

  ranking.sort((a, b) => b.cf - a.cf);

  if (ranking.length === 0) {
    hasil.innerHTML = "<p><em>Tidak ada penyakit yang cocok.</em></p>";
  } else {
    hasil.innerHTML = "<p><strong>Gejala dipilih:</strong> " + dipilih.join(", ") + "</p>";
    hasil.innerHTML += `<h3>Hasil Diagnosa:</h3><ol>` + 
      ranking.map(r => `<li><strong>${r.penyakit}</strong> (CF: ${r.cf})</li>`).join("") + 
    `</ol>`;
  }
}
