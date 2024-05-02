import {faPlus,faCircleXmark,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalUsers from "./ModalUsers";

export default function Modal({modalType, closeCreate, formData, handleChange, handleSubmit}) {

  const showInfoModal = (modalType) => {
    switch (modalType) {
        case "users":
            console.log("yooooooooooooooooooooooooooooooooooooooo")
            return <ModalUsers 
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        case "works":
            return <ModalWork />
        default:
            return null
    }
  }

  return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeCreate}>
            <FontAwesomeIcon
              icon={faCircleXmark}
              size="lg"
              style={{ color: "#113778" }}
            />
          </span>
          {showInfoModal(modalType)}
        </div>
      </div>
  );
}
