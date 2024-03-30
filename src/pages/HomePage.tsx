import appdownload from "../assets/appDownload.png";
import landing from "../assets/landing.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg -mt-16 shadow-lg py-8 flex flex-col gap-5 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck Into a Takeaway Today
        </h1>
        <span className="text-xl">Food is just a click away</span>
      </div>
      <div className="grid items-center md:grid-cols-2 gap-5">
        <img src={landing} alt="" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-3xl tracking-tighter">
            Order Takeaway Even Faster!
          </span>
          <span>
            DownLoad the MernEats App for faster ordering and personalised
            recommendations
          </span>

          <img src={appdownload} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
