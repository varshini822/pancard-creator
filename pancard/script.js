document.addEventListener('DOMContentLoaded', function() {
    const panForm = document.getElementById('panForm');
    const panCardContainer = document.getElementById('panCardContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    
    panForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.toUpperCase();
        const fatherName = document.getElementById('fatherName').value.toUpperCase();
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        
        // Format date of birth
        const dobDate = new Date(dob);
        const formattedDob = dobDate.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).toUpperCase();
        
        // Generate random PAN number
        const panNumber = generatePAN(name, gender);
        
        // Create PAN card HTML
        const panCardHTML = `
            <div class="pan-card">
                <div class="pan-card-header">
                    <h2>INCOME TAX DEPARTMENT</h2>
                    <div class="income-tax">GOVT. OF INDIA</div>
                </div>
                <div class="pan-number">${panNumber}</div>
                <div class="pan-details">
                    <div class="detail-row">
                        <div class="detail-label">NAME:</div>
                        <div class="detail-value">${name}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">FATHER'S NAME:</div>
                        <div class="detail-value">${fatherName}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">DATE OF BIRTH:</div>
                        <div class="detail-value">${formattedDob}</div>
                    </div>
                </div>
                <div class="signature">
                    <div class="signature-line"></div>
                    <div>Signature</div>
                </div>
            </div>
        `;
        
        // Display PAN card
        panCardContainer.innerHTML = panCardHTML;
        downloadBtn.disabled = false;
    });
    
    // Download PAN card as image
    downloadBtn.addEventListener('click', function() {
        if (!downloadBtn.disabled) {
            const panCard = document.querySelector('.pan-card');
            html2canvas(panCard).then(canvas => {
                const link = document.createElement('a');
                link.download = 'pan-card.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    });
    
    // Function to generate random PAN number
    function generatePAN(name, gender) {
        // PAN format: ABCDE1234F
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        
        // First 5 characters (letters)
        let pan = '';
        for (let i = 0; i < 5; i++) {
            pan += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        // Next 4 characters (numbers)
        for (let i = 0; i < 4; i++) {
            pan += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        
        // Last character based on gender
        pan += gender === 'MALE' ? 'P' : 'T';
        
        // Insert space for better readability
        pan = pan.slice(0, 5) + ' ' + pan.slice(5, 9) + ' ' + pan.slice(9);
        
        return pan;
    }
});