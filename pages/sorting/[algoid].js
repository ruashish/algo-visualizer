import { setAlgoId, setAlgoName } from "/redux/reducers/pageSlice";
import { setRunning, resetStats } from "/redux/reducers/sortingSlice";
import { useDispatch, useSelector } from "react-redux";

import Footer from "/components/Footer";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import SortingControllers from "/components/AlgoPage/Sorting/Controllers";
import StatsContainer from "/components/AlgoPage/Sorting/Stats";
import { ToProperCase } from "/utils";
import VisualizerContainer from "/components/AlgoPage/Sorting/Visualizer";
import VisualizerEdgeLeftIcon from "/public/assets/visualizer-edge-left-icon.svg";
import VisualizerEdgeRightIcon from "/public/assets/visualizer-edge-right-icon.svg";
import { batch } from "react-redux";
import { generateNewArray } from "/components/AlgoPage/Sorting/SortingUtils/generateArray";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AlgoData from "/components/AlgoPage/Sorting/AlgoData";

const Sorting = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(setRunning(false));
      dispatch(resetStats());
    });
    var rawAlgoId = router.query.algoid;
    var algoName = ToProperCase(rawAlgoId);

    if (algoName != undefined) {
      batch(() => {
        dispatch(setAlgoId(rawAlgoId));
        dispatch(setAlgoName(algoName));
        generateNewArray();
      });
    }
  });

  return (
    <div>
      <Head>
        <title>{useSelector((state) => state.page.algoName)} | AlgoSpace</title>
      </Head>
      <div className="px-gap">
        <SortingControllers />
        <VisualizerContainer />
        <div className="flex justify-between mt-[-12px]">
          <Image
            className="scale-[0.8]"
            src={VisualizerEdgeLeftIcon}
            alt="icon"
          />
          <Image
            className="scale-[0.8]"
            src={VisualizerEdgeRightIcon}
            alt="icon"
          />
        </div>
        <StatsContainer />
        <AlgoData />
        <Footer />
      </div>
    </div>
  );
};

export default Sorting;
