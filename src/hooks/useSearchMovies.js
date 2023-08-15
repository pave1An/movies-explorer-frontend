// import { useState } from 'react';

// function useSearchMovies() {
//   const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
//   const [request, setRequest] = useState('');

//   function turnCheckbox() {
//     setIsCheckboxChecked(!isCheckboxChecked);
//     // console.log(isCheckboxChecked);
//   }

//   function handleChangeRequest(e) {
//     setRequest(e.target.value);
//   }

//   function filterMovies(movies) {
//     const lowerCaseRequest = request.toLowerCase();
//     return (movies.filter(
//       (movie) => {
//         if (isCheckboxChecked && movie.duration > 40) return false;
//         return movie.nameRU.toLowerCase().includes(lowerCaseRequest)
//         || movie.nameEN.toLowerCase().includes(lowerCaseRequest);
//       },
//     ));
//   }

//   return {
//     turnCheckbox, filterMovies, handleChangeRequest, request, isCheckboxChecked,
//   };
// }

// export default useSearchMovies;
