
function SignUp() {
  return (
    <div class="container-xxl">
        <div class="row vh-100 d-flex justify-content-center">
            <div class="col-12 align-self-center">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-4 mx-auto">
                            <div class="card">
                                <div class="card-body p-0 bg-black auth-header-box rounded-top">
                                    <div class="text-center p-3">
                                        <a href="index.html" class="logo logo-admin">
                                            <img src="assets/images/logo-main.png" height="50" alt="logo" class="auth-logo" />
                                        </a>
                                        <h4 class="mt-3 mb-1 fw-semibold text-white fs-18">Create an account</h4>   
                                        <p class="text-muted fw-medium mb-0">Enter your detail to Create your account today.</p>  
                                    </div>
                                </div>
                                <div class="card-body pt-0">                                    
                                    <form class="my-4" action="">            
                                        <div class="form-group mb-2">
                                            <label class="form-label" for="username">Username</label>
                                            <input type="text" class="form-control" id="username" name="username" placeholder="Enter username" />                               
                                        </div>

                                        <div class="form-group mb-2">
                                            <label class="form-label" for="useremail">Email</label>
                                            <input type="email" class="form-control" id="useremail" name="user email" placeholder="Enter email" />                               
                                        </div>
            
                                        <div class="form-group mb-2">
                                            <label class="form-label" for="userpassword">Password</label>                                            
                                            <input type="password" class="form-control" name="password" id="userpassword" placeholder="Enter password" />                            
                                        </div>

                                        <div class="form-group mb-2">
                                            <label class="form-label" for="Confirmpassword">ConfirmPassword</label>                                            
                                            <input type="password" class="form-control" name="password" id="Confirmpassword" placeholder="Enter Confirm password" />                            
                                        </div>

                                        <div class="form-group mb-2">
                                            <label class="form-label" for="mobileNo">Mobile Number</label>
                                            <input type="text" class="form-control" id="mobileNo" name="mobile number" placeholder="Enter Mobile Number" />                               
                                        </div>
            
                                        {/* <div class="form-group row mt-3">
                                            <div class="col-12">
                                                <div class="form-check form-switch form-switch-primary">
                                                    <input class="form-check-input" type="checkbox" id="customSwitchprimary" />
                                                    <label class="form-check-label" for="customSwitchprimary">By registering you agree to the Materialy <a href="#" class="text-primary">Terms of Use</a></label>
                                                </div>
                                            </div> 
                                        </div> */}
            
                                        <div class="form-group mb-0 row">
                                            <div class="col-12">
                                                <div class="d-grid mt-3">
                                                    <button class="btn btn-primary" type="button">Log In <i class="fas fa-sign-in-alt ms-1"></i></button>
                                                </div>
                                            </div> 
                                        </div>                           
                                    </form>
                                    <div class="text-center">
                                        <p class="text-muted">Already have an account ?  <a href="/login" class="text-primary ms-2">Log in</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>                                    
    </div>
  )
}

export default SignUp