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
            nextRankRequired: 200,
            points: [
                {
                    id: 'add-cash',
                    title: 'Add cash',
                    current: 15,
                    max: 30,
                    description: '<p>Deposit funds to your Minipay wallet to gain points.</p>Weekly limit: 30 points.',
                    color: 'linear-gradient(to right, #00CEFF, #6C5CE7)'
                },
                {
                    id: 'referrals',
                    title: 'Referrals',
                    current: 30,
                    max: 30,
                    description: '<p>Earn points for each valid referral.</p> Weekly limit: 30 points.',
                    color: 'linear-gradient(to right, #00B894, #00CEFF)'
                },
				{
                    id: 'balance',
                    title: 'Holding balance',
                    current: 20,
                    max: 100,
                    description: '<p>Hold your balance to win points.</p> Weekly limit: 100 points.',
                    color: ''
                },
				{
                    id: 'p2p',
                    title: 'P2P transactions',
                    current: 9,
                    max: 20,
                    description: '<p>Earn points for sending transactions.</p> Weekly limit: 20 points.',
                    color: ''
                },
				{
                    id: 'crossBorder',
                    title: 'Cross-border Sends',
                    current: 25,
                    max: 50,
                    description: '<p>Earn points for sending cross-border transactions.</p> Weekly limit: 50 points.',
                    color: ''
                },
                {
                    id: 'appUsage',
                    title: 'Mini App Usage',
                    current: 42,
                    max: 70,
                    description: '<p>Use Mini Apps to complete transactions and earn points.</p> Weekly limit: 70 points.',
                    color: 'linear-gradient(to right, #FDCB6E, #00B894)'
                },
                {
                    id: 'billPayments',
                    title: 'Bill Payments',
                    current: 20,
                    max: 100,
                    description: '<p>Pay bills with MiniPay to earn points.</p> Weekly limit: 100 points.',
                    color: 'linear-gradient(to right, #FF7675, #FDCB6E)'
                }
            ]
        }
    };
	initPage();
            // Function to generate a random color
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
            const progress = (point.current / point.max) * 100;
            const pointElement = document.createElement('div');
                    
            pointElement.innerHTML = `
                <div class="progress-container">
                    <div class="progress-header">
                        <span class="progress-title">${point.title}</span>
                        <span class="progress-stats">${point.current}/${point.max} pts</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%; background: ${point.color || getRandomColor()}"></div>
                    </div>
                    <div class="progress-description">
                        ${point.description}
                    </div>
                    ${index < points.length - 1 ? '<div class="divider"></div>' : ''}
                </div>
            `;
                    
            container.appendChild(pointElement);
        });
    }
	
    
	function initPage() {
        // 使用更可靠的选择器路径
        const lastWeekScore = document.getElementById('lastRankInfo').firstElementChild.lastElementChild;
		const currentWeekScore = document.getElementById('currentRankInfo').firstElementChild.lastElementChild;
		
		lastWeekScore.textContent = `${userData.lastWeek.score} pts`;
        currentWeekScore.textContent = `${userData.currentWeek.score} pts`;
        
        // 设置下一等级要求
        const nextRankElement = document.querySelector('.next-rank-value');
        if (nextRankElement) {
            nextRankElement.textContent = `Required: ${userData.currentWeek.nextRankRequired} pts`;
        }
        
        // 渲染动态积分项目
        renderPointsBreakdown(userData.currentWeek.points);
    }            
});
