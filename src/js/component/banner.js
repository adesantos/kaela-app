import React from "react";
import ImgBanner from "../../img/banner.jpg";

export function Banner() {
	return (
		<div className="col-12">
			<div className="row">
				<img src={ImgBanner} className="img-fluid" alt="..." />
			</div>
		</div>
	);
}
