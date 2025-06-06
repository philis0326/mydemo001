document.addEventListener('DOMContentLoaded', function() {    
    // Rank configuration
    const ranks = {
        'Starter': { rate: 0.005, badgeClass: 'starter', next: 'Mover' },
        'Mover': { rate: 0.01, badgeClass: 'mover', next: 'Shaker' },
        'Shaker': { rate: 0.015, badgeClass: 'shaker', next: 'Master' },
        'Master': { rate: 0.025, badgeClass: 'master', next: null }
    };
	
	const userData = {
        yesterdayBalance: 50.75,
        dailyEarning: 0.036,
        lastWeekRank: 'Starter',
        currentWeekRank: 'Mover',               
    };
	
	for (let key in userData){
		key in localStorage ? userData[key] = localStorage.getItem(key) : localStorage.setItem(key,userData[key]);
	}
	userData.appliedRate = ranks[userData.lastWeekRank]['rate'];
	userData.projectedRate = ranks[userData.currentWeekRank]['rate'];
	
	initPage();
	
    // Initialize the page with user data
    function initPage() {
        document.getElementById('yesterday-balance').textContent = `$${userData.yesterdayBalance}`;
        document.getElementById('daily-earning').textContent = `$${userData.dailyEarning}`;
        document.getElementById('applied-rate').textContent = `${(userData.appliedRate * 100)}%`;
        document.getElementById('projected-rate').textContent = `${(userData.projectedRate * 100)}%`;        
                
        // Set up slider
        const slider = document.getElementById('balance-slider');
        slider.value = userData.yesterdayBalance;
		console.log(slider.value);
        updateSimulation(slider.value);
                
        // Add slider event listener
        slider.addEventListener('input', function() {
            updateSimulation(this.value);
        });
                
        // Add button event listeners
        document.getElementById('add-cash-btn').addEventListener('click', function() {
            alert('Redirecting to add cash page...');            
        });
                
        document.getElementById('upgrade-rank-btn').addEventListener('click', function() {            
            window.location.href = 'points.html';
        });
    }
            
    // Update the simulation values based on slider input
    function updateSimulation(balance) {
        const balanceNum = parseFloat(balance);
        const projectedWeeklyEarning = balanceNum * userData.projectedRate;
		const projectedEarning = balanceNum * userData.projectedRate/7;
                
        document.getElementById('simulated-balance').textContent = `$${balanceNum}`;
        document.getElementById('projected-weekly-earning').textContent = `$${projectedWeeklyEarning.toFixed(2)}`;
		document.getElementById('projected-earning').textContent = `$${projectedEarning.toFixed(2)}`;
    }
});
