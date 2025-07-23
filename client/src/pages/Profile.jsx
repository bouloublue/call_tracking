import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import styles from "../pages/Home.module.css";


function Profile() {
    return (
        <>
            <div className={styles.pageTitleBox}>
                <div className={styles.pageTitleContainer}>
                    <div className={`${styles.row} ${styles.gap0}`}>
                        <div className={styles.col12}>
                            <div className={`${styles.pageTitleContent} ${styles.dSmFlex} ${styles.justifyContentSmBetween} ${styles.alignItemsCenter}`}>
                                <div>
                                    <ol className={styles.breadcrumb}>
                                        <li className={styles.breadcrumbItem}>
                                            <a href="/">Call Tracking</a>
                                        </li>
                                        <li className={`${styles.breadcrumbItem} ${styles.active}`}>Profile</li>
                                    </ol>
                                    <h1 className={styles.pageTitle}>Profile</h1>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SideBar />
            <div>
                <div className="page-wrapper">
                    <div className="page-content">
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-body p-4  rounded text-center img-bg">
                                        </div>
                                        <div className="position-relative">
                                            <div className="shape overflow-hidden text-card-bg">
                                                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="card-body mt-n6">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <div className="d-flex align-items-center">
                                                        <div className="position-relative">
                                                            <img src="assets/images/users/avatar-2.jpg" alt="" className="rounded-circle img-fluid" />
                                                            <div className="position-absolute top-50 start-100 translate-middle">
                                                                <img src="assets/images/flags/us_flag.jpg" alt="" className="rounded-circle thumb-sm border border-3  border-white" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 text-truncate ms-3 align-self-end">
                                                            <h5 className="m-0 fs-3 fw-bold">Admin</h5>
                                                            <p className="text-muted mb-0 mt-n1">@admin</p>
                                                        </div>
                                                        <div className="align-self-center">
                                                            <span className="badge bg-success-subtle text-success border border-success px-2">Admin</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mt-3">
                                                    <div class="text-body mb-2  d-flex align-items-center fs-13"><i class="las la-language fs-20 me-1 text-muted"></i><span class="text-body fw-semibold">Company :</span> Call Tracking</div>
                                                    <div class="text-muted mb-2 d-flex align-items-center fs-13"><i class="las la-envelope fs-20 me-1"></i><span class="text-body fw-semibold">Email :</span><a href="#" class="text-primary text-decoration-underline">admin@example.com</a></div>
                                                    <div class="text-body mb-3 d-flex align-items-center fs-13"><i class="las la-phone fs-20 me-1 text-muted"></i><span class="text-body fw-semibold">Phone :</span> +1 123 456 789</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <ul className="nav nav-tabs mb-3" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link fw-medium active" data-bs-toggle="tab" href="#settings" role="tab" aria-selected="true">Settings</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link fw-medium " data-bs-toggle="tab" href="#post" role="tab" aria-selected="false">Company Settings</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        {/* <div className="tab-pane active" id="post" role="tabpanel">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row d-flex justify-content-center">
                                                        <div className="col">
                                                            <p className="text-dark mb-1 fw-semibold">Views</p>
                                                            <h3 className="my-2 fs-22 fw-bold">2M</h3>
                                                            <p className="mb-0 text-truncate text-muted"><i className="las la-bell text-warning fs-18"></i>
                                                                <span className="text-dark fw-semibold">1500</span> New subscribers this week
                                                            </p>
                                                        </div>
                                                        <div className="col-auto align-self-center">
                                                            <div className="d-flex justify-content-center align-items-center thumb-lg border rounded mx-auto">
                                                                <i className="iconoir-eye fs-30 align-self-center text-secondary"></i>
                                                            </div>                                                                    
                                                        </div>
                                                    </div> 
                                                </div> 
                                            </div>   
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row d-flex justify-content-center">
                                                        <div className="col">
                                                            <p className="text-dark mb-1 fw-semibold">Comments</p>
                                                            <h3 className="my-2 fs-22 fw-bold">14k</h3>
                                                            <p className="mb-0 text-truncate text-muted"><i className="las la-thumbs-up text-success fs-18"></i>
                                                                <span className="text-dark fw-semibold">854</span> New Like this week
                                                            </p>
                                                        </div>
                                                        <div className="col-auto align-self-center">
                                                            <div className="d-flex justify-content-center align-items-center thumb-lg border rounded mx-auto">
                                                                <i className="iconoir-chat-lines fs-26 align-self-center text-secondary"></i>
                                                            </div>
                                                        </div>
                                                    </div>    
                                                </div> 
                                            </div> 
                                        </div>
                                    </div> 
                                    <div className="row">
                                        <div className="col-12">                                            
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="row align-items-center">
                                                        <div className="col">                      
                                                            <div className="d-flex align-items-center">
                                                                <img src="assets/images/users/avatar-10.jpg" className="thumb-md align-self-center rounded-circle" alt="...">
                                                                <div className="flex-grow-1 ms-2">
                                                                    <h5 className="m-0 fs-14">Anderson Vanhron</h5>
                                                                    <p className="text-muted mb-0 fs-12">online</p>
                                                                </div><!--end media-body-->
                                                            </div>                     
                                                        </div>
                                                        <div className="col-auto">                      
                                                            <div className="d-none d-sm-inline-block align-self-center">
                                                                <a href="#" className="me-2 text-muted" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Call" data-bs-custom-className="tooltip-primary"><i className="iconoir-media-image fs-18"></i></a>
                                                                <a href="#" className="me-2 text-muted" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Attachment" data-bs-custom-className="tooltip-primary"><i className="iconoir-attachment fs-18"></i></a>
                                                                <a href="#" className="me-2 text-muted" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Delete" data-bs-custom-className="tooltip-primary"><i className="iconoir-calendar fs-18"></i></a>
                                                                
                                                                <div className="dropdown d-inline-block">
                                                                    <a className="dropdown-toggle arrow-none text-muted" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="true">
                                                                        <i className="iconoir-more-vert fs-18"></i>
                                                                    </a>
                                                                    <div className="dropdown-menu dropdown-menu-end pb-0" >
                                                                        <a className="dropdown-item" href="#">Profile</a>
                                                                        <a className="dropdown-item" href="#">Add archive</a>
                                                                        <a className="dropdown-item" href="#">Delete</a>
                                                                        <a className="dropdown-item text-danger" href="#">Block</a>
                                                                    </div>
                                                                </div>                                                       
                                                            </div>                  
                                                        </div>
                                                    </div>                                    
                                                </div>
                                                <div className="card-body pt-0">  
                                                    <form action="#">
                                                        <div className="">
                                                            <textarea className="form-control mb-2" id="post-1" rows="5" placeholder="Write here.."></textarea>
                                                            <button type="button" className="btn btn-primary">Post</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>  
                                        <div className="col-12">                                            
                                            <div className="card">
                                                <div className="card-body">                                                                                          
                                                    <img src="assets/images/extra/card/post-1.jpg" alt="" className="img-fluid">
                                                    <div className="post-title mt-3">
                                                        <div className="row">
                                                            <div className="col">
                                                                <span className="badge bg-primary-subtle text-primary">Natural</span>
                                                            </div>
                                                            <div className="col-auto">
                                                                <span className="text-muted"><i className="far fa-calendar me-1"></i>02 July 2024</span>
                                                            </div>
                                                        </div>
                                                       
                                                        <h5 href="#" className="fs-20 fw-bold d-block my-3">There is nothing more beautiful than nature.</h5>
                                                        <span className="fs-13 bg-light py-1 px-2 rounded">Taking pictures is savouring life intensely.</span>
                                                        <p className="fs-13 mt-3">It is a long established fact that a reader will be distracted by the readable content of 
                                                            a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
                                                            more-or-less normal distribution of letters, as opposed to using 
                                                            'Content here, content here', making it look like readable English. 
                                                            Many desktop publishing packages and web page editors now use Lorem Ipsum 
                                                            as their default model text, and a search for 'lorem ipsum' will uncover many
                                                             web sites still in their infancy. 

                                                        </p>
                                                        <blockquote className="blockquote border-start ps-4">
                                                            <p className="fs-16"><i>"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."</i></p>
                                                            <footer className="blockquote-footer mt-1">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                                                        </blockquote>
                                                        <p className="fs-13">Taking pictures is savouring life intensely, every hundredth of a second – Marc Riboud.
                                                            Joy in looking and comprehending is nature’s most beautiful gift.</p>
                                                        <p className="fs-13 mb-0">It is a long established fact that a reader will be distracted by the readable content of 
                                                            a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
                                                            more-or-less normal distribution of letters, as opposed to using 
                                                            'Content here, content here', making it look like readable English. 
                                                            Many desktop publishing packages and web page editors now use Lorem Ipsum 
                                                            as their default model text, and a search for 'lorem ipsum' will uncover many
                                                             web sites still in their infancy. 

                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <div className="row mb-3">
                                                        <div className="col">
                                                            <p className="text-dark fw-semibold mb-0 fs-14">Artical tags</p>
                                                        </div>
                                                    </div>
                                                    <span className="badge bg-light text-dark px-3 py-2 fw-semibold">Music</span>
                                                    <span className="badge bg-light text-dark px-3 py-2 fw-semibold">Animals</span>
                                                    <span className="badge bg-light text-dark px-3 py-2 fw-semibold">Natural</span>
                                                    <span className="badge bg-light text-dark px-3 py-2 fw-semibold">Food</span>
                                                    <span className="badge bg-light text-dark px-3 py-2 fw-semibold">Fashion</span>
                                                    <span className="badge bg-light text-dark px-3 py-2 fw-semibold">Helth</span>
                                                    <span className="badge bg-light text-dark px-3 py-2 fw-semibold">Charity</span>
                                                </div>
                                            </div>   
                                            <div className="card">
                                                <div className="card-body pb-0">
                                                    <div className="row">
                                                        <div className="col">
                                                            <p className="text-dark fw-semibold mb-0">Comments (205)</p>
                                                        </div>
                                                    </div>    
                                                </div>
                                                <div className="card-body border-bottom-dashed"> 
                                                    <ul className="list-unstyled mb-0">
                                                        <li>
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <img src="assets/images/users/avatar-2.jpg" alt="" className="thumb-md rounded-circle">
                                                                </div>
                                                                <div className="col">
                                                                    <div className="bg-light rounded ms-n2 bg-light-alt p-3">
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <p className="text-dark fw-semibold mb-2">Martin Luther</p>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <span className="text-muted fs-11"><i className="far fa-clock me-1"></i>30 min ago</span>
                                                                            </div>
                                                                        </div>                                                                
                                                                        <p className="fs-13">It is a long established fact that a reader will be distracted by the 
                                                                            readable content of a page when looking at its layout. The point of 
                                                                            using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
                                                                            as opposed to using 'Content here, content here', making it look like readable English.
                                                                        </p>
                                                                        <a href="#" className="text-primary fs-13"><i className="fas fa-reply me-1"></i>Replay</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ul className="list-unstyled ms-5">
                                                                <li>
                                                                    <div className="row mt-3">
                                                                        <div className="col-auto">
                                                                            <img src="assets/images/logo-sm.png" alt="" className="thumb-md rounded-circle">
                                                                        </div>
                                                                        <div className="col">
                                                                            <div className="bg-light rounded ms-n2 bg-light-alt p-3">
                                                                                <div className="row">
                                                                                    <div className="col">
                                                                                        <p className="text-dark fw-semibold mb-2">Metrica Author</p>
                                                                                    </div>
                                                                                    <div className="col-auto">
                                                                                        <span className="text-muted fs-11"><i className="far fa-clock me-1"></i>37 min ago</span>
                                                                                    </div>
                                                                                </div>                                                                
                                                                                <p className="fs-13">It is a long established fact that a reader will be distracted by the 
                                                                                    readable content of a page when looking at its layout. 
                                                                                </p>
                                                                                <p className="mb-0 fs-13">Thank you</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li className="mt-3">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <img src="assets/images/users/avatar-1.jpg" alt="" className="thumb-md rounded-circle">
                                                                </div>
                                                                <div className="col">
                                                                    <div className="bg-light rounded ms-n2 bg-light-alt p-3">
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <p className="text-dark fw-semibold mb-2">Joseph Rust</p>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <span className="text-muted fs-11"><i className="far fa-clock me-1"></i>40 min ago</span>
                                                                            </div>
                                                                        </div>                                                                
                                                                        <p className="fs-13">Is it a long established fact that a reader will be distracted by the 
                                                                            readable content of a page when looking at its layout?
                                                                        </p>
                                                                        <a href="#" className="text-primary fs-13"><i className="fas fa-reply me-1"></i>Replay</a>
                                                                    </div>
                                                                </div>
                                                            </div> 
                                                        </li>
                                                        <li className="mt-3">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <img src="assets/images/users/avatar-5.jpg" alt="" className="thumb-md rounded-circle">
                                                                </div>
                                                                <div className="col">
                                                                    <div className="bg-light rounded ms-n2 bg-light-alt p-3">
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <p className="text-dark fw-semibold mb-2">Matt Rosales</p>
                                                                            </div>
                                                                            <div className="col-auto">
                                                                                <span className="text-muted fs-11"><i className="far fa-clock me-1"></i>40 min ago</span>
                                                                            </div>
                                                                        </div>                                                                
                                                                        <p className="fs-13">Is it a long established fact that a reader will be distracted by the 
                                                                            readable content of a page when looking at its layout?
                                                                        </p>
                                                                        <a href="#" className="text-primary fs-13"><i className="fas fa-reply me-1"></i>Replay</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ul className="list-unstyled ms-5">
                                                                <li>
                                                                    <div className="row mt-3">
                                                                        <div className="col-auto">
                                                                            <img src="assets/images/logo-sm.png" alt="" className="thumb-md rounded-circle">
                                                                        </div>
                                                                        <div className="col">
                                                                            <div className="bg-light rounded ms-n2 bg-light-alt p-3">
                                                                                <div className="row">
                                                                                    <div className="col">
                                                                                        <p className="text-dark fw-semibold mb-2">Metrica Author</p>
                                                                                    </div>
                                                                                    <div className="col-auto">
                                                                                        <span className="text-muted fs-11"><i className="far fa-clock me-1"></i>37 min ago</span>
                                                                                    </div>
                                                                                </div>                                                                
                                                                                <p className="fs-13">It is a long established fact that a reader will be distracted by the 
                                                                                    readable content of a page when looking at its layout. 
                                                                                </p>
                                                                                <p className="mb-0 fs-13">Thank you</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            </ul> 
                                                        </li>
                                                    </ul> 
                                                </div> 
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col">
                                                            <p className="text-dark fw-semibold mb-0">Leave a comment</p>
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="card-body pt-0">
                                                    <form>
                                                        <div className="form-group mb-3">
                                                            <textarea className="form-control" rows="5" id="leave_comment" placeholder="Message"></textarea>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-12 text-end">
                                                                <button type="submit" className="btn btn-primary px-4">Send Message</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>           
                                            </div>   
                                        </div>                                                
                                    </div>
                                </div> */}
                                        {/* <div className="tab-pane p-3" id="gallery" role="tabpanel">
                                    <div id="grid" className="row g-0">
                                        <div className="col-md-6 col-lg-4 picture-item">
                                            <a href="assets/images/extra/card/img-1.jpg" className="lightbox">
                                                <img src="assets/images/extra/card/img-1.jpg" alt="" className="img-fluid" />
                                            </a>  
                                        </div>
                                        <div className="col-md-6 col-lg-4 picture-item picture-item--overlay">
                                            <a href="assets/images/extra/card/img-2.jpg" className="lightbox">
                                                <img src="assets/images/extra/card/img-2.jpg" alt="" className="img-fluid" />
                                            </a> 
                                        </div>
                                        <div className="col-md-6 col-lg-4 picture-item">
                                            <a href="assets/images/extra/card/img-3.jpg" className="lightbox">
                                                <img src="assets/images/extra/card/img-3.jpg" alt="" className="img-fluid" />
                                            </a> 
                                        </div>
                                        <div className="col-md-6 col-lg-4 picture-item picture-item--h2">
                                            <a href="assets/images/extra/card/img-4.jpg" className="lightbox">
                                                <img src="assets/images/extra/card/img-4.jpg" alt="" className="img-fluid" />
                                            </a> 
                                        </div>
                                        <div className="col-md-6 col-lg-4 picture-item">
                                            <a href="assets/images/extra/card/img-5.jpg" className="lightbox">
                                                <img src="assets/images/extra/card/img-5.jpg" alt="" className="img-fluid" />
                                            </a> 
                                        </div>
                                        <div className="col-md-6 col-lg-4 picture-item picture-item--overlay">
                                            <a href="assets/images/extra/card/img-6.jpg" className="lightbox">
                                                <img src="assets/images/extra/card/img-6.jpg" alt="" className="img-fluid" />
                                            </a> 
                                        </div>                 
                                    </div> 
                                </div>                                                 */}
                                        <div className="tab-pane p-3 active" id="settings" role="tabpanel">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h4 className="card-title">Personal Information</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Name</label>
                                                        <div className="col-lg-9 col-xl-8">
                                                            <input className="form-control" type="text" value="Admin" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Company Name</label>
                                                        <div className="col-lg-9 col-xl-8">
                                                            <input className="form-control" type="text" value="Call Tracking" />
                                                        </div>
                                                    </div>

                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Contact Phone</label>
                                                        <div className="col-lg-9 col-xl-8">
                                                            <div className="input-group">
                                                                <span className="input-group-text"><i className="las la-phone"></i></span>
                                                                <input type="text" className="form-control" value="+123456789" placeholder="Phone" aria-describedby="basic-addon1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Email Address</label>
                                                        <div className="col-lg-9 col-xl-8">
                                                            <div className="input-group">
                                                                <span className="input-group-text"><i className="las la-at"></i></span>
                                                                <input type="text" className="form-control" value="call.tracking@demo.com" placeholder="Email" aria-describedby="basic-addon1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Website Link</label>
                                                        <div className="col-lg-9 col-xl-8">
                                                            <div className="input-group">
                                                                <span className="input-group-text"><i className="la la-globe"></i></span>
                                                                <input type="text" className="form-control" value="" placeholder="Email" aria-describedby="basic-addon1" />
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Location</label>
                                                        <div className="col-lg-9 col-xl-8">
                                                            <select className="form-select">
                                                                <option>USA</option>
                                                                <option>London</option>
                                                                <option>India</option>
                                                                <option>Canada</option>
                                                                <option>Thailand</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-lg-9 col-xl-8 offset-lg-3">
                                                            <button type="submit" className="btn btn-primary" style={{ padding: "10px 20px", background: "#2E6F6E" }}>Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4 className="card-title">Change Password</h4>
                                                </div>
                                                <div className="card-body pt-0">
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">New Password</label>
                                                        <div className="col-lg-9 col-xl-8">
                                                            <input className="form-control" type="password" placeholder="New Password" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group mb-3 row">
                                                        <label className="col-xl-3 col-lg-3 text-end mb-lg-0 align-self-center form-label">Confirm Password</label>
                                                        <div className="col-lg-9 col-xl-8">
                                                            <input className="form-control" type="password" placeholder="Re-Password" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-lg-9 col-xl-8 offset-lg-3">
                                                            <button type="submit" className="btn btn-primary" style={{ padding: "10px 20px", background: "#2E6F6E" }}>Change Password</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile