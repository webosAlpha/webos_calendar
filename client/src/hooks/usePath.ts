import { useRecoilState } from "recoil";
import { pathState } from "../atoms/pathAtom";

function usePath() {
  const [path, setPath] = useRecoilState(pathState);

  const goBack = () => {
    let tempIndex = path.lastIndexOf("/");
    setPath(path.slice(0, tempIndex));
  };

  const goHome = () => {
    setPath("home");
  };

  return { goBack, goHome };
}

export default usePath;
