document.addEventListener('DOMContentLoaded', () => {
	const styleLink1 = document.createElement('link');
	styleLink1.rel = "stylesheet";
	styleLink1.type = "text/css";
	styleLink1.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
	
	const styleLink2 = document.createElement('link');
	styleLink2.rel = "stylesheet";
	styleLink2.type = "text/css";
	styleLink2.href = "https://gcore.jsdelivr.net/gh/philis0326/mydemo001/engagement_layer.css";
	
	document.head.append(styleLink1,styleLink2);

// User data
	const userData = {		
		points: ('egg_points' in localStorage) ? Number(localStorage.getItem('egg_points')) : 0,
		checkinDays: ('checkin_days' in localStorage) ? Number(localStorage.getItem('checkin_days')) : 0,
		username: ('username' in localStorage) ? localStorage.getItem('username') : "Guest User",
		avatar: ('avatar' in localStorage) ? localStorage.getItem('avatar') : null
	};

document.body.innerHTML += `<!-- Check-in Modal (now at bottom) -->
    <div id="checkinModal" class="checkin-modal hidden">
        <div class="checkin-content">
            <button id="closeCheckin" class="close-btn">
                <i class="fas fa-times"></i>
            </button>
            <div class="checkin-body" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="checkin-icon">
                    <i class="fas fa-paw"></i>
                </div>
                <h3>Daily Check-in</h3>
				<div style="display: flex; flex-direction: column; max-width: 60%">
                <p style="text-align: left"><i class="fas fa-medal" style="width:20px"></i> Get rewarded for checking in</p>
				<p style="text-align: left"><i class="fas fa-ranking-star" style="width:20px"></i> Climb the leaderboard</p>
                <p class="streak-text" style="text-align: left"><i class="fas fa-calendar-week" style="width:20px"></i> Current streak: <span id="checkinDays">3</span> days</p>
				</div>
                <button id="checkinBtn" class="checkin-button">
                    Check In Now
                </button>
            </div>
        </div>
    </div>

    <!-- Points Floating Button -->
    <div id="pointsBtn" class="points-button">
        <i class="fas fa-fish"></i>
        <div id="pointsBadge" class="points-badge hidden">0</div>
    </div>

    <!-- Points Effect -->
    <div id="pointsEffect" class="points-effect hidden">+5</div>

    <!-- Leaderboard Modal -->
    <div id="leaderboardModal" class="leaderboard-modal hidden">
        <div class="modal-header">
            <button id="closeLeaderboard" class="back-btn">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h2>Points Leaderboard</h2>
            <div class="header-spacer"></div>
        </div>
        
        <div class="modal-content">
            <!-- User Info -->
            <div class="user-profile">
                <div class="user-info">
                    <div id="userAvatar" class="user-avatar">
                        <i class="fas fa-kiwi-bird"></i>
                    </div>
                    <div>
                        <h3 id="username">Guest User</h3>
                        <p>Edit</p>
                    </div>
                </div>
                <div class="user-stats">
                    <div>
                        <p>Current Points</p>
                        <p id="my_current_point">0</p>
                    </div>
                    <div>
                        <p>Current Rank</p>
                        <p>#15</p>
                    </div>
                    <div>
                        <p>Check-in Streak</p>
                        <p id="my_current_checkin_days">0 days</p>
                    </div>
                </div>
            </div>
            
            <!-- Leaderboard -->
            <div class="leaderboard-section">
                <h3>Top 30 Leaderboard</h3>
                <div class="leaderboard-list">
                    <!-- Leaderboard Items -->
                    <div class="leaderboard-item highlighted">
                        <div class="rank">1</div>
                        <div class="avatar">
                            <i class="fas fa-crow"></i>
                        </div>
                        <div class="name">EagleEye</div>
                        <div class="points">1024 pts</div>
                    </div>
                    <div class="leaderboard-item">
                        <div class="rank">2</div>
                        <div class="avatar">
                            <i class="fas fa-dog"></i>
                        </div>
                        <div class="name">FastDog</div>
                        <div class="points">876 pts</div>
                    </div>
                    <div class="leaderboard-item">
                        <div class="rank">3</div>
                        <div class="avatar">
                            <i class="fas fa-cat"></i>
                        </div>
                        <div class="name">CleverCat</div>
                        <div class="points">765 pts</div>
                    </div>
                    <!-- More items... -->
                    <div class="leaderboard-item current-user">
                        <div class="rank">15</div>
                        <div class="avatar" id="avatar_in_rank">
                            <i class="fas fa-kiwi-bird"></i>
                        </div>
                        <div class="name" id="username_in_rank">Guest User</div>
                        <div class="points" id="points_in_rank">125 pts</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit Profile Modal -->
    <div id="editProfileModal" class="edit-modal hidden">
        <div class="modal-header">
            <button id="closeEditProfile" class="back-btn">
                <i class="fas fa-arrow-left"></i>
            </button>
            <h2>Edit Profile</h2>
            <div class="header-spacer"></div>
        </div>
        
        <div class="modal-content">
            <div class="avatar-upload">
                <div id="avatarPreview" class="avatar-preview">
                    <i class="fas fa-kiwi-bird"></i>
                    <input type="file" id="avatarUpload" accept="image/*">
                    <div class="camera-icon">
                        <i class="fas fa-camera"></i>
                    </div>
                </div>
                <button id="changeAvatar" class="change-avatar-btn">Change Avatar</button>
            </div>
            
            <div class="form-group">
                <label for="usernameInput">Nickname</label>
                <input id="usernameInput" type="text" placeholder="Enter your nickname" value="Guest User">
            </div>
            
            <button id="saveProfile" class="save-button">
                Save Changes
            </button>
        </div>
    </div>

    <!-- Wheel of Fortune Modal -->
    <div id="lotteryModal" class="lottery-modal hidden">
        <div class="lottery-content">
            <button id="closeLottery" class="close-btn">
                <i class="fas fa-times"></i>
            </button>
            <div class="lottery-body">
                <h3>Weekly Check-in Complete!</h3>
                <p>Spin the wheel to win prizes</p>                
                <div id="wheel-container" class="wheel-container">
					<canvas id="wheel-canvas"></canvas>
					<div id="pointer"></div>
				</div>
				<button id="spin-button" class="spin-button">Spin the wheel</button>
            </div>
        </div>
    </div>`;

// DOM elements
const checkinModal = document.getElementById('checkinModal');
const closeCheckin = document.getElementById('closeCheckin');
const checkinBtn = document.getElementById('checkinBtn');
const pointsBtn = document.getElementById('pointsBtn');
const pointsEffect = document.getElementById('pointsEffect');
const leaderboardModal = document.getElementById('leaderboardModal');
const closeLeaderboard = document.getElementById('closeLeaderboard');
const editProfileModal = document.getElementById('editProfileModal');
const closeEditProfile = document.getElementById('closeEditProfile');
const changeAvatar = document.getElementById('changeAvatar');
const avatarUpload = document.getElementById('avatarUpload');
const avatarPreview = document.getElementById('avatarPreview');
const usernameInput = document.getElementById('usernameInput');
const saveProfile = document.getElementById('saveProfile');
const userAvatar = document.getElementById('userAvatar');
const usernameDisplay = document.getElementById('username');
const lotteryModal = document.getElementById('lotteryModal');
const closeLottery = document.getElementById('closeLottery');
const canvas = document.getElementById('wheel-canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spin-button');
const wheelContainer = document.getElementById('wheel-container');

spinButton.addEventListener('click', spinWheel);

// Initialize
function init() {
	if(userData.checkinDays === 7){
		userData.checkinDays = 0;
		localStorage.setItem('checkin_days', userData.checkinDays);
		userData.points = 0;
		localStorage.setItem('egg_points', userData.points);
	}
    document.getElementById('checkinDays').textContent = userData.checkinDays;
	if(userData.avatar!==null){
		userAvatar.innerHTML = `<img src="${userData.avatar}" class="avatar-img">`;
		document.getElementById("avatar_in_rank").innerHTML = `<img src="${userData.avatar}" class="avatar-img">`;
	}
	usernameDisplay.textContent = userData.username;
	document.getElementById("username_in_rank").textContent = userData.username;
	document.getElementById("my_current_point").textContent = userData.points;
	document.getElementById("points_in_rank").textContent = userData.points + " pts";
	if(!('todayCheckin' in localStorage)){
		setTimeout(() => {
            checkinModal.classList.remove('hidden');
        }, 1500);
	}else if(new Date().getTime() - Number(localStorage.getItem('todayCheckin')) > 30000){
		setTimeout(() => {
            checkinModal.classList.remove('hidden');
        }, 1500);
	}else{
		simulateUserBehavior();
	}	
}


// Simulate user behavior
function simulateUserBehavior() {
    if(Number(userData.points) < userData.checkinDays * 70){
		let randomTime = Math.floor(Math.random() * 1500) + 2000;
		pollInterval = setInterval(() => {					
			addPoints(5);
			randomTime = Math.floor(Math.random() * 1500) + 2000;
		}, randomTime);
	}
}

// Add points
function addPoints(points) {    
	if(Number(userData.points) >= userData.checkinDays * 70){
		clearInterval(pollInterval);
		console.log(userData.checkinDays);
		return;
	}
	userData.points += points;
	localStorage.setItem('egg_points', userData.points);
	showPointsEffect();
	document.getElementById("my_current_point").textContent = userData.points;
	document.getElementById("points_in_rank").textContent = userData.points + " pts";
}

// Show points effect
function showPointsEffect() {
    pointsEffect.textContent = `+${5}`;
    pointsEffect.classList.remove('hidden');
    pointsEffect.style.opacity = '1';
    pointsEffect.style.bottom = '100px';
    pointsEffect.style.right = '80px';
    
    setTimeout(() => {
        pointsEffect.style.opacity = '0';
        pointsEffect.style.bottom = '120px';
    }, 500);
    
    setTimeout(() => {
        pointsEffect.classList.add('hidden');
    }, 1000);
    
    pointsBtn.classList.add('bounce-animation');
    setTimeout(() => {
        pointsBtn.classList.remove('bounce-animation');
    }, 1000);
}

// Event listeners
closeCheckin.addEventListener('click', () => {
    checkinModal.classList.add('hidden');
});

checkinBtn.addEventListener('click', () => {    
    userData.checkinDays++;
    localStorage.setItem('checkin_days', userData.checkinDays);
	let timestamp = new Date().getTime();
	localStorage.setItem('todayCheckin',timestamp);
    document.getElementById('checkinDays').textContent = userData.checkinDays;
    checkinBtn.innerHTML = '<i class="fas fa-check"></i> Checked In';
    checkinBtn.classList.add('checked-in');
    
    if (userData.checkinDays >= 3) {
        poll1 = setTimeout(() => {
            checkinModal.classList.add('hidden');
            lotteryModal.classList.remove('hidden');
			resizeCanvas();
        }, 1500);
    } else {
        poll2 = setTimeout(() => {
            checkinModal.classList.add('hidden');
        }, 1500);
    }
	if(typeof pollInterval === "undefined"){simulateUserBehavior();}
	document.getElementById("my_current_checkin_days").textContent = userData.checkinDays + " days";
	alert("You've checked in! Browse & earn now!");
});

pointsBtn.addEventListener('click', () => {
    leaderboardModal.classList.remove('hidden');
});

closeLeaderboard.addEventListener('click', () => {
    leaderboardModal.classList.add('hidden');
});

userAvatar.addEventListener('click', () => {
    editProfileModal.classList.remove('hidden');
});

closeEditProfile.addEventListener('click', () => {
    editProfileModal.classList.add('hidden');
});

changeAvatar.addEventListener('click', () => {
    avatarUpload.click();
});

avatarUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            userData.avatar = event.target.result;
            avatarPreview.innerHTML = `<img src="${userData.avatar}" class="avatar-img">`;            
        };
        reader.readAsDataURL(file);
    }
});

saveProfile.addEventListener('click', () => {
    userAvatar.innerHTML = `<img src="${userData.avatar}" class="avatar-img">`;
	document.getElementById("avatar_in_rank").innerHTML = `<img src="${userData.avatar}" class="avatar-img">`;
	userData.username = usernameInput.value;
	document.getElementById("username_in_rank").textContent = userData.username;
    usernameDisplay.textContent = userData.username;
	localStorage.setItem('username', userData.username);
	localStorage.setItem('avatar', userData.avatar);
    editProfileModal.classList.add('hidden');
});

closeLottery.addEventListener('click', () => {
    lotteryModal.classList.add('hidden');
});

function resizeCanvas() {
            const size = wheelContainer.clientWidth;
            canvas.width = size;
            canvas.height = size;
            drawWheel();
        }


        // 奖项设置
        const segments = [
            "Thank you",
            "$0.05",
            "$0.2",
            "$1.00",
            "$5.00",
            "Mysterious gift"
        ];

        const colors = [
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#F333FF",
            "#FF33A8",
            "#33FFF3"
        ];

        let startAngle = 0;
        const arc = Math.PI / (segments.length / 2);
        let spinTimeout = null;

        // 绘制转盘
        function drawWheel() {
            const size = canvas.width;
            const center = size / 2;
            const radius = center - 10;
            ctx.clearRect(0, 0, size, size);

            // 绘制每个扇区
            for(let i = 0; i < segments.length; i++) {
                const angle = startAngle + i * arc;
                ctx.beginPath();
                ctx.moveTo(center, center);
                ctx.arc(center, center, radius, angle, angle + arc, false);
                ctx.fillStyle = colors[i % colors.length];
                ctx.fill();
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.save();

                // 奖项文字
                ctx.translate(center, center);
                ctx.rotate(angle + arc / 2);
                ctx.textAlign = "right";
                ctx.fillStyle = "#fff";
                ctx.font = `${Math.floor(radius / 10)}px sans-serif`;
                ctx.fillText(segments[i], radius - 30, 10);
                ctx.restore();
            }
        }

        // 旋转转盘
        let isSpinning = false;
        function spinWheel() {
            if(isSpinning) return;
            isSpinning = true;
            spinButton.disabled = true;

            const spinAngleStart = Math.random() * 10 + 10;
            const spinTimeTotal = Math.random() * 3000 + 4000;
            let spinTime = 0;

            function rotate() {
                spinTime += 30;
                if(spinTime >= spinTimeTotal){
                    stopRotate(spinTime);
                    return;
                }
                const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
                startAngle += (spinAngle * Math.PI / 180);
                startAngle %= 2 * Math.PI;
                drawWheel();
                spinTimeout = setTimeout(rotate, 30);
            }

            rotate();
        }

        function stopRotate(spinTime) {
            clearTimeout(spinTimeout);
            const degrees = startAngle * 180 / Math.PI + 90;
            const arcd = arc * 180 / Math.PI;
            const index = Math.floor((360 - (degrees % 360)) / arcd);
            ctx.save();
            const selectedPrize = segments[index];
            ctx.restore();
            alert(`Congratulations! You won：${selectedPrize}`);
            isSpinning = false;
            spinButton.disabled = false;
			closeLottery.click();
        }

        // 缓动函数
        function easeOut(t, b, c, d) {
            t /= d;
            t--;
            return c * (t*t*t + 1) + b;
        }

// Initialize
init();

});