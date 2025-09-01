
function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
    }
}
//checkLoginStatus();

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
}