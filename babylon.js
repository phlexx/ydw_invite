// @ts-check
(function () {
    var canvas = document.getElementById("renderCanvas");

    var engine = null;
    var scene = null;
    var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true }); };
    var delayCreateScene = function () {
        // Create a scene.
        var scene = new BABYLON.Scene(engine);

        // Create a default skybox with an environment.
        var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("environment.dds", scene);
        var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);
        //scene.createDefaultCameraOrLight(true, true, true);
        scene.createDefaultCamera(true, true, true);

        // Append glTF model to scene.
        BABYLON.SceneLoader.Append("./", "ydw.glb", scene, function (scene) {
            // Create a default arc rotate camera and light.
            scene.createDefaultCameraOrLight(true, true, true);

            // The default camera looks at the back of the asset.
            // Rotate the camera by 180 degrees to the front of the asset.
            scene.activeCamera.alpha += Math.PI;
        });

        return scene;
    };

    engine = createDefaultEngine();
    if (!engine) throw 'engine should not be null.';
    scene = delayCreateScene();

    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });

})();