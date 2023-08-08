import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
export const doNothing = () => {};


export const showError = (
  errorText,
  showCancelButton = true,
  showConfirmButton = true,
  confirmButtonText = "Retry",
  onRetry = doNothing
) => {
  MySwal.fire({
    icon: "error",
    title: "Oops...",
    showCancelButton: showCancelButton,
    showConfirmButton: showConfirmButton,
    confirmButtonText: confirmButtonText,
    text: errorText,
  }).then((result) => {
    if (result.isConfirmed) {
      onRetry();
    }
  });
};


export default MySwal;
