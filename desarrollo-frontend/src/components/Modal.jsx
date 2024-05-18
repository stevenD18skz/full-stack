import { faPlus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalUsers from "./ModalUsers";
import ModalWorks from "../components/ModalWorks";
import ModalTask from "./ModalTask";
//ola ana
//buenas noches nita
//adios
export default function Modal({
  modalType,
  crudType,
  formData,
  closeModal,
  handleSubmit,
  setFormData,
  objectModel,
}) {
  const showInfoModal = (modalType) => {
    switch (modalType) {
      case "users":
        return (
          <ModalUsers
            modalType={modalType}
            formData={formData}
            handleSubmit={handleSubmit}
            usuario={objectModel}
            crudType={crudType}
            setFormData={setFormData}
          />
        );


        
      case "works":
        return <ModalWorks 
            modalType={modalType}
            crudType={crudType}
            formData={formData}
            handleSubmit={handleSubmit}
            setFormData={setFormData}
            objectModel={objectModel}/>;

      case "tasks":
        return <ModalTask 
              modalType={modalType}
              crudType={crudType}
              formData={formData}
              handleSubmit={handleSubmit}
              setFormData={setFormData}
              objectModel={objectModel}/>;      



      default:
        return null;
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
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
