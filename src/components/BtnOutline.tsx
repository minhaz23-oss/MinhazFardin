const BtnOutline = ({text}:any) => {
  return (
    <button
  className="px-8 py-2 border border-white/30 rounded-md text-white font-bold backdrop-blur-md bg-transparent hover:bg-white/20 hover:border-white/50 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 ease-out"
>
  {text}
</button>
  );
};

export default BtnOutline;
