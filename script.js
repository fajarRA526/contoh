const gejalaList = [
  'Badan Panas', 'Sakit Kepala', 'Bersin-bersin',
  'Batuk', 'Pilek, Hidung Buntu', 'Badan Lemas', 'Kedinginan'
];

const pengetahuan = [
  ['Anemia', 'Sakit Kepala', 0.7, 0.2],
  ['Anemia', 'Badan Lemas', 0.8, 0.1],
  ['Bronkhitis', 'Badan Panas', 0.6, 0.2],
  ['Bronkhitis', 'Bersin-bersin', 0.7, 0.4],
  ['Bronkhitis', 'Batuk', 0.8, 0.1],
  ['Demam', 'Kedinginan', 0.7, 0.1],
  ['Demam', 'Badan Lemas', 0.6, 0.2],
  ['Demam', 'Badan Panas', 0.8, 0.1],
  ['Flu', 'Badan Panas', 0.6, 0.2],
  ['Flu', 'Sakit Kepala', 0.7, 0.2],
  ['Flu', 'Bersin-bersin', 0.6, 0.2],
  ['Flu', 'Batuk', 0.6, 0.1],
  ['Flu', 'Pilek, Hidung Buntu', 0.8, 0.1],
  ['Flu', 'Badan Lemas', 0.7, 0.1],
  ['Flu', 'Kedinginan', 0.8, 0.05]
];

// Tampilkan checkbox gejala
const listGejala = document.getElementById('list-gejala');
gejalaList.forEach((g, i) => {
  listGejala.innerHTML += `
    <label><input type="checkbox" name="gejala" value="${g}"> ${g}</label><br>
  `;
});

document.getElementById('formGejala').addEventListener('submit', function(e) {
  e.preventDefault();
  const dipilih = Array.from(document.querySelectorAll('input[name="gejala"]:checked')).map(x => x.value);
  const penyakitTerpilih = [];

  const hasilCF = {};

  // Cari penyakit yang sesuai gejala
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

  // Tampilkan hasil
  const hasil = document.getElementById('hasil');
  hasil.innerHTML = "<h3>Hasil Diagnosa:</h3>";
  if (ranking.length === 0) {
    hasil.innerHTML += "<p><em>Tidak ada penyakit yang cocok.</em></p>";
  } else {
    hasil.innerHTML += `<ol>` + ranking.map(r => `<li>${r.penyakit}: <strong>${r.cf}</strong></li>`).join('') + `</ol>`;
  }
});
