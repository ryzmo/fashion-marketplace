// lib/daftarWilayah.js

export const getProvinsiList = async () => {
    const res = await fetch('https://ibnux.github.io/data-indonesia/provinsi.json');
    const data = await res.json();
    return data; // format: [{ id: "11", nama: "ACEH" }, ...]
  };
  
  export const getKotaList = async (provinsiId) => {
    if (!provinsiId) return [];
    const res = await fetch(`https://ibnux.github.io/data-indonesia/kabupaten/${provinsiId}.json`);
    const data = await res.json();
    return data; // format: [{ id: "1101", nama: "KAB. SIMEULUE" }, ...]
  };
  