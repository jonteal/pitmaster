type NameValuePairProps = {
  value: string | number | string[];
  type?: string;
  name: string;
};
export const NameValuePair = ({ name, value, type }: NameValuePairProps) => (
  <div className="my-4">
    <p className="text-gray-400">{name}</p>

    {(() => {
      switch (type) {
        case "heading":
          return <h1 className="text-gray-200 text-3xl">{value}</h1>;
        case "list":
          return (
            <ul className="list-disc pl-5">
              {Array.isArray(value) &&
                value.map((item, index) => (
                  <li key={index} className="text-gray-200">
                    {item}
                  </li>
                ))}
            </ul>
          );
        default:
          return <p className="text-gray-200">{value}</p>;
      }
    })()}
  </div>
);
