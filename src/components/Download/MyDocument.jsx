import jsPDF from 'jspdf';

const generatePDF = (data) => {
    
    const doc = new jsPDF();
    const total = data.reduce((acc,curr)=>acc+ Number(curr.amount),0);
    doc.text('Expense Report', 10, 10);
    doc.text('_____________________________________________________________________________________________', 0, 20);
    doc.text('Category', 10, 30);
    doc.text('Description', 70, 30);
    doc.text('Amount (Rs.)', 170, 30);
    doc.text('_____________________________________________________________________________________________', 0, 40);
    var i=5;
    data.forEach(expense=>{
        doc.text(expense.category, 10, i*10);
        doc.text(expense.description, 70, i*10);
        doc.text(expense.amount, 170, i*10);
        i++;
    })
    doc.text('_____________________________________________________________________________________________', 0, i++*10);
    doc.text('Total Expenses', 10, i*10);
    doc.text(`${total}`, 170, i++*10);
    doc.text('_____________________________________________________________________________________________', 0, i++*10);
    return doc.output('datauristring');
}

export default generatePDF;