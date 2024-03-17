import jsPDF from 'jspdf';

const generatePDF = (props) => {
    const doc = new jsPDF();
    doc.text('Expense Report', 10, 10);
    console.log(props.data)
    props.data.forEach(element => {
      doc.text(element.category, 10, 10);
    });
    return doc.output('datauristring');
}

export default generatePDF;