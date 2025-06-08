document.addEventListener('DOMContentLoaded', async () => {
    const newPasswordInput = document.getElementById('new-password-input');
    const updateNewPasswordBtn = document.getElementById('update-new-password-btn');
    const resetPasswordError = document.getElementById('reset-password-error');
    const goToLoginBtn = document.getElementById('go-to-login-btn');
    const formContainer = document.getElementById('reset-password-form-container');

    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    const accessToken = urlParams.get('access_token');

    // Initial check: If no token or type=recovery is present, redirect to login
    if (typeParam !== 'recovery' || !accessToken) {
        resetPasswordError.textContent = "Tautan reset password tidak valid atau sudah kedaluwarsa.";
        resetPasswordError.classList.remove('hidden');
        if (updateNewPasswordBtn) updateNewPasswordBtn.classList.add('hidden');
        if (newPasswordInput) newPasswordInput.classList.add('hidden');
        if (goToLoginBtn) goToLoginBtn.classList.remove('hidden');
        goToLoginBtn.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirect to main login page
        });
        return; // Stop execution
    }

    // Set the session with the token from the URL. This validates the token.
    try {
        const { error } = await supabaseClient.auth.setSession({ access_token: accessToken });
        if (error) throw error;
        
        // Clean the URL after successfully setting the session
        history.replaceState(null, '', window.location.origin + window.location.pathname);

    } catch (e) {
        console.error("Error setting session for password reset:", e);
        resetPasswordError.textContent = "Tautan reset password tidak valid atau sudah kedaluwarsa. Silakan coba lagi.";
        resetPasswordError.classList.remove('hidden');
        if (updateNewPasswordBtn) updateNewPasswordBtn.classList.add('hidden');
        if (newPasswordInput) newPasswordInput.classList.add('hidden');
        if (goToLoginBtn) goToLoginBtn.classList.remove('hidden');
        goToLoginBtn.addEventListener('click', () => {
            window.location.href = 'index.html'; // Redirect to main login page
        });
        return; // Stop execution
    }

    if (updateNewPasswordBtn) {
        updateNewPasswordBtn.addEventListener('click', async () => {
            const newPassword = newPasswordInput.value.trim();
            resetPasswordError.classList.add('hidden');

            if (newPassword.length < 6) {
                resetPasswordError.textContent = "Password minimal 6 karakter.";
                resetPasswordError.classList.remove('hidden');
                return;
            }

            // Update the user's password
            const { error } = await supabaseClient.auth.updateUser({
                password: newPassword
            });

            if (error) {
                resetPasswordError.textContent = error.message;
                resetPasswordError.classList.remove('hidden');
            } else {
                // Success message and redirect to login
                formContainer.innerHTML = `<p style="text-align:center; color: var(--theme-text-primary);">
                    <i class="fas fa-check-circle" style="font-size: 1.5em; color: var(--theme-primary);"></i><br><br>
                    Password Anda berhasil diubah.<br>
                    Anda dapat login sekarang.
                </p>
                <button id="go-to-login-final-btn" class="btn-primary">Pergi ke Halaman Login</button>`;
                
                document.getElementById('go-to-login-final-btn').addEventListener('click', () => {
                    window.location.href = 'index.html'; // Redirect to main login page
                });
            }
        });
    }
});