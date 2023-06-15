var headers = {};
var url = "http://localhost:3000";
var actualTest = '';
var urlParams = new URLSearchParams(window.location.search);
var idExamen = urlParams.get('id');
function generarPdf(){

    const generatePdfButton = document.getElementById('generate-pdf');
    const content = document.body;
      generatePdfButton.addEventListener('click', function() {
     
  
    // Utiliza html2canvas para convertir el contenido en un canvas
    html2canvas(content).then(function(canvas) {
      // Crea un objeto jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      // Calcula la relación de aspecto del canvas
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Convierte el canvas en una imagen en formato DataURL
      const imgData = canvas.toDataURL('image/png');
  
      // Agrega la imagen al objeto jsPDF
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  
      // Guarda y descarga el PDF
      pdf.save('pagina-web.pdf');
    });
  });
}

