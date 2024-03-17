import generatePDF from "./MyDocument";
import { useEffect, useState } from "react";

const { Modal, Button } = require("react-bootstrap");


const DownloadModal = (props) => {
    const [show, setShow] = useState(false);

    console.log(props || '')
    // const pdf = generatePDF(props) || '';


    const {showModal} = props;
    useEffect(()=>{
        if(showModal)
        {
            handleShow();
            props.hideModal();
        }
    },[showModal]);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const downloadPdf = () => {
        const link = document.createElement('a');
        link.href = pdf; // 'pdfContent' is the URL of your PDF content
        link.download = `report_${new Date().toISOString()}.pdf`; // Set the download attribute to specify the filename
        link.click();
        
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Download expense report</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { pdf && <iframe title="PDF Viewer" src={pdf} width="100%" height="500px" /> }
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            
            <Button variant="primary" onClick={downloadPdf}>
                download
            </Button>
            </Modal.Footer>
      </Modal>
    )
}

export default DownloadModal;