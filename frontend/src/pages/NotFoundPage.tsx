import errorIcon from "../assets/cancel.png"

const NotFoundPage = () => {
  return ( 
    <div className="h-whole bg-orange-100">
      <div className="h-whole bg-orange-100">
        <div className="flex-col text-center py-20">
          <img src={errorIcon} alt="addwishlist image" className="h-48 w-48 mx-auto"/>
          <div className="my-6 text-xl font-bold">Error 404 - Page not found!</div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;