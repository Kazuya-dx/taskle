interface IconProps {
  icon: string;
  background: string;
  decoration: string;
  size: string;
}

const Icon: React.FC<IconProps> = ({ icon, background, decoration, size }) => {
  const style = {
    width: size,
    height: size,
    backgroundColor: background,
    margin: decoration,
    padding: icon,
  };
  return <div style={style}></div>;
};

export default Icon;
