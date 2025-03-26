document.addEventListener('DOMContentLoaded', function() {

    const userData = {
        lastWeek: {
            score: 99,
            rank: 'Mover'
        },
        currentWeek: {
            score: 125,
            rank: 'Shaker',
            nextRank: 'Master',
            nextRankRequired: 300,
            points: [
                {
                    id: 'add-cash',
                    title: 'Add cash',
                    current: 15,
                    max: 30,
                    description: 'Earn points for each deposit',
                    color: 'linear-gradient(to right, #00CEFF, #6C5CE7)'
                },
                {
                    id: 'referrals',
                    title: 'Refer Friends',
                    current: 30,
                    max: 30,
                    description: 'Each valid referral earns points',
                    color: 'linear-gradient(to right, #00B894, #00CEFF)'
                },
				{
                    id: 'balance',
                    title: 'Hold a Higher Balance',
                    current: 20,
                    max: 100,
                    description: 'The more you hold, the more points you gain',
                    color: ''
                },
				{
                    id: 'p2p',
                    title: 'P2P transactions',
                    current: 9,
                    max: 20,
                    description: 'Send transactions.',
                    color: ''
                },
				{
                    id: 'crossBorder',
                    title: 'Cross-border transactions',
                    current: 25,
                    max: 50,
                    description: 'Send cross-border transactions.',
                    color: ''
                },
                {
                    id: 'appUsage',
                    title: 'Daily tasks',
                    current: 42,
                    max: 70,
                    description: 'Earn points by completing daily tasks',
                    color: 'linear-gradient(to right, #FDCB6E, #00B894)'
                },
                {
                    id: 'billPayments',
                    title: 'Spend Stablecoins',
                    current: 20,
                    max: 100,
                    description: 'Level up when you spend with Mini Apps',
                    color: 'linear-gradient(to right, #FF7675, #FDCB6E)'
                }
            ]
        }
    };
	    
	// Calculate progress percentage	
	const progressPercent = (userData.currentWeek.score / userData.currentWeek.nextRankRequired) * 100;
  
	// Update progress bar
	document.querySelector('.progress-fill').style.width = `${Math.min(progressPercent, 100)}%`;
	
	initPage();
	
    function getRandomColor() {
        const colors = [
            'linear-gradient(to right, #00CEFF, #6C5CE7)',
            'linear-gradient(to right, #00B894, #00CEFF)',
            'linear-gradient(to right, #FDCB6E, #00B894)',
            'linear-gradient(to right, #FF7675, #FDCB6E)',
            'linear-gradient(to right, #6C5CE7, #FF7675)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Function to render points breakdown
    function renderPointsBreakdown(points) {
        const container = document.getElementById('points-breakdown-container');
        container.innerHTML = '';
                
        points.forEach((point, index) => {            
			const isCapped = point.current >= point.max;
            const pointElement = document.createElement('div');
			pointElement.className = `progress-container ${isCapped ? 'capped' : ''}`;
                    
            pointElement.innerHTML = `                
                    <div class="progress-header">
                        <span class="progress-title">${point.title}</span>
						<span class=${isCapped ? "capped-badge" : 'noncapped-badge'}>${isCapped ? "Max reached" : "Available"}</span>	                        
                    </div>                    
                    <div class="progress-description">
                        <span>${point.description}</span>												
                    </div>					
                    ${index < points.length - 1 ? '<div class="divider"></div>' : ''}                
            `;
                    
            container.appendChild(pointElement);
        });
    }
	
    
	function initPage() {        
        const lastWeekScore = document.getElementById('lastRankInfo').firstElementChild.lastElementChild;
		const lastWeekRank = document.getElementById('lastRankInfo').lastElementChild.lastElementChild;
		const currentWeekScore = document.querySelector('.rank-milestones').firstElementChild.lastElementChild;
		const currentWeekRank = document.querySelector('.rank-milestones').firstElementChild.firstElementChild;
		const nextRankRequiredScore = document.querySelector('.rank-milestones').lastElementChild.lastElementChild;
		const nextRank = document.querySelector('.rank-milestones').lastElementChild.firstElementChild;
		
		lastWeekScore.textContent = `${userData.lastWeek.score} pts`;
		lastWeekRank.textContent = userData.lastWeek.rank;
		lastWeekRank.classList.add(userData.lastWeek.rank.toLowerCase());
        currentWeekScore.textContent = `${userData.currentWeek.score} pts`;
		currentWeekRank.textContent = userData.currentWeek.rank;
		currentWeekRank.classList.add(userData.currentWeek.rank.toLowerCase());
        nextRankRequiredScore.textContent = `${userData.currentWeek.nextRankRequired} pts`;
		nextRank.textContent = userData.currentWeek.nextRank;
		nextRank.classList.add(userData.currentWeek.nextRank.toLowerCase());
		
        // 设置下一等级要求
        const nextRankElement = document.querySelector('.next-rank-value');
        if (nextRankElement) {
            nextRankElement.textContent = `Required: ${userData.currentWeek.nextRankRequired} pts`;
        }
        
        // 渲染动态积分项目
        renderPointsBreakdown(userData.currentWeek.points);
    }            
});
