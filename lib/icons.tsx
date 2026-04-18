import { TiHeartFullOutline } from "react-icons/ti"
import { TbFlowerFilled, TbTargetArrow } from "react-icons/tb"
import { PiFlowerLotusFill } from "react-icons/pi"
import { FaLeaf, FaSmile, FaSmileBeam, FaRunning } from "react-icons/fa"
import { BsStars } from "react-icons/bs"
import { MdOutlineStar } from "react-icons/md"
import { RiDiamondFill } from "react-icons/ri"
import { GiWeightLiftingUp, GiWhiteBook, GiMeditation, GiNotebook, GiNightSleep } from "react-icons/gi"
import { IoWater, IoFastFood } from "react-icons/io5"
import { IoMdLaptop } from "react-icons/io"

export const iconMap: Record<string, React.ReactNode> = {
  heart: <TiHeartFullOutline size={28} />,
  flower: <TbFlowerFilled size={28} />,
  lotus: <PiFlowerLotusFill size={28} />,
  leaf: <FaLeaf size={28} />,
  smile: <FaSmile size={28} />,
  stars: <BsStars size={28} />,
  star: <MdOutlineStar size={28} />,
  smilebeam: <FaSmileBeam size={28} />,
  diamond: <RiDiamondFill size={28} />,
  workout: <GiWeightLiftingUp size={28} />,
  read: <GiWhiteBook size={28} />,
  water: <IoWater size={28} />,
  meditate: <GiMeditation size={28} />,
  journal: <GiNotebook size={28} />,
  sleep: <GiNightSleep size={28} />,
  run: <FaRunning size={28} />,
  laptop: <IoMdLaptop size={28} />,
  food: <IoFastFood size={28} />,
  target: <TbTargetArrow size={28} />,
}