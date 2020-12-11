import React from "react";
import { Link } from "react-router-dom";
import Img1 from "../../img/img1.jpg";
import Img2 from "../../img/img2.jpg";
import Img3 from "../../img/img3.jpg";
import Img4 from "../../img/img4.jpg";
import Img5 from "../../img/img5.jpg";
import Img6 from "../../img/inst.png";
import Img7 from "../../img/etsy.png";
import Img8 from "../../img/amaz.png";

export function Home() {
	return (
		<div className="col-12 home padding-bottom">
			<div className="row">
				<div id="kalea-title" className="col-12">
					<h2 className="margin-top">KAELA</h2>
					<hr />
				</div>

				<div className="img-info">
					<img src={Img1} className="img-fluid" alt="" />
					<div className="info">
						<h3>Hand Made Lingerie</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.{" "}
						</p>
					</div>
				</div>
				<div className="img-info">
					<div className="info">
						<h3>Our pieces are unique</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.{" "}
						</p>
					</div>
					<img src={Img2} className="img-fluid" alt="" />
				</div>

				<div id="best-sellers" className="col-12">
					<div className="row">
						<div className="picture col-3">
							<Link to="/products">
								<div className="frame">
									<img src={Img3} className="img-fluid" alt="..." />
								</div>
							</Link>
						</div>
						<div className="picture col-6">
							<Link to="/products">
								<div className="frame">
									<img src={Img4} className="img-fluid" alt="..." />
								</div>
							</Link>
						</div>
						<div className="picture col-3">
							<Link to="/products">
								<div className="frame">
									<img src={Img5} className="img-fluid" alt="..." />
								</div>
							</Link>
						</div>
						<div className="col-12 title">
							<Link to="/products">
								<h2>BEST SELLERS</h2>
							</Link>
							<hr />
						</div>
					</div>
				</div>

				<div id="stores" className="col-12">
					<div className="row">
						<div className="col-4">
							<a target="_blank" href="https://www.instagram.com/kaela.shop/">
								<img src={Img6} className="img-fluid" alt="..." />
							</a>
						</div>
						<div className="col-4">
							<a target="_blank" href="https://www.etsy.com/shop/KaelaShopBoutique">
								<img src={Img7} className="img-fluid" alt="..." />
							</a>
						</div>
						<div className="col-4">
							<a target="_blank" href="https://www.amazon.com/-/es/dp/B088MDG9TF/?ref=exp_kaela.shop_dp_vv_mw">
								<img src={Img8} className="img-fluid" alt="..." />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
