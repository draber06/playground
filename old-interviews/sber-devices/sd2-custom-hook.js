import React, { useEffect } from "react";

let _active = false;

const useIsActive = () => {
    const [active, setIsActive] = React.useState(_active);

    useEffect(() => {
        setIsActive(active);
        em.on("active", setIsActive);

        return () => em.off("active", setIsActive);
    }, [active]);

    return active;
};
