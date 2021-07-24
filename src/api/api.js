export const API_URL = "https://api.themoviedb.org/3";

export const API_KEY_3 = "c97fc8c34ff5cbb4fedcc9f59c558b38";


export const API_KEY_4 = 'yJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTdmYzhjMzRmZjVjYmI0ZmVkY2M5ZjU5YzU1OGIzOCIsInN1YiI6IjVlY2Y0N2M4ZTRiNTc2MDAxZjJjNzYxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8n-R1rnBAo4eNcUZ2nzF914eUi79FNNaOEjegOccuOk'




export const fetchApi = (url, options = {}) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(response => {
          if (response.status < 400) {
            return response.json();
          } else {
            throw response;
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(response => {
          response.json().then(error => {
            reject(error);
          });
        });
    });
  };