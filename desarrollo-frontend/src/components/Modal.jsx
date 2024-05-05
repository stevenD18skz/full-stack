import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalUsers from "./ModalUsers";
//ola ana
//buenas noches ana
export default function Modal({
  modalType,
  closeCreate,
  formData,
  setFormData,
  handleChange,
  handleSubmit,
  usuario,
  crudType
}) {
  const showInfoModal = (modalType) => {
    switch (modalType) {
      case "users":
        return (
          <ModalUsers
            modalType={modalType}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            usuario={usuario}
            crudType={crudType}
            setFormData={setFormData}
          />
        );
      case "works":
        return <ModalWork />;
      default:
        return null;
    }
  };

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
