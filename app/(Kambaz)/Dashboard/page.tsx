import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1234" className="wd-dashboard-course-link">
                        <Image src="/images/reactjs.jpg" alt="reactjs" width={200} height={150} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title">
                                Full Stack software developer
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1235" className="wd-dashboard-course-link">
                        <Image src="/images/ussr.png" alt="hist" width={200} height={150} />
                        <div>
                            <h5> HIST1286 History of the Soviet Union </h5>
                            <p className="wd-dashboard-course-title">
                                A full history of the Union of Soviet Socialist Republics (USSR)
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1236" className="wd-dashboard-course-link">
                        <Image src="/images/psych.jpg" alt="psych" width={200} height={150} />
                        <div>
                            <h5> PSYC1000 Psychology 101 </h5>
                            <p className="wd-dashboard-course-title">
                                Introduction to psychology
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1237" className="wd-dashboard-course-link">
                        <Image src="/images/calc.png" alt="calc" width={200} height={150} />
                        <div>
                            <h5> MATH2985 Calculus III </h5>
                            <p className="wd-dashboard-course-title">
                                Multivariable calculus
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1238" className="wd-dashboard-course-link">
                        <Image src="/images/writing.webp" alt="writing" width={200} height={150} />
                        <div>
                            <h5> ENGW2281 Advanced Writing </h5>
                            <p className="wd-dashboard-course-title">
                                Advanced Writing in the Technical Professions
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1239" className="wd-dashboard-course-link">
                        <Image src="/images/anatomy.png" alt="anatomy" width={200} height={150} />
                        <div>
                            <h5> BIO1029 Anatomy </h5>
                            <p className="wd-dashboard-course-title">
                                Human Anatomy
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link href="/Courses/1240" className="wd-dashboard-course-link">
                        <Image src="/images/cs.avif" alt="cs" width={200} height={150} />
                        <div>
                            <h5> CS3500 Object-Oriented Design </h5>
                            <p className="wd-dashboard-course-title">
                                Object-Oriented Java Programming
                            </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );}
