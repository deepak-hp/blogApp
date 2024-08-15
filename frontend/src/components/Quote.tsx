export const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4">
        <div className="max-w-lg text-3xl font-bold">
          "The customer support I received was exceptional. The support team
          went above and beyond to address my concerns."
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-semibold">Jules Winnfield</div>
          <div className="text-slate-400 font-light">CEO, Acme Inc</div>
        </div>
      </div>
    </div>
  );
};
