<template>
  <div ref="container">
    <DisPwin :niiGzPath="niiGzPath" :labelPath="labelPath"></DisPwin>
  </div>
</template>

<script>
import DisPwin from './dis.vue';
import * as THREE from 'three';

export default {
  name: 'Display_win',

  components: {
    DisPwin,
  },


  props: {
    niiGzPath: {
      type: String,
      required: true
    },
    labelPath: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.initScene();
    this.loadData();
    this.loadLabelData();
    this.addViews();
    this.animate();
  },
  methods: {
    initScene() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        45,
        this.$refs.container.offsetWidth / this.$refs.container.offsetHeight,
        0.1,
        1000
      );
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(
        this.$refs.container.offsetWidth,
        this.$refs.container.offsetHeight
      );
      this.$refs.container.appendChild(this.renderer.domElement);
    },

    loadData() {
      const loader = new THREE.NIFTIReader();
      loader.load(this.niiGzPath, nifti => {
        const data = nifti.getData();
        const geometry = new THREE.BoxGeometry(nifti.hdr.dims[1], nifti.hdr.dims[2], nifti.hdr.dims[3]);
        const texture = new THREE.DataTexture3D(data, nifti.hdr.dims[1], nifti.hdr.dims[2], nifti.hdr.dims[3]);
        texture.format = THREE.RedFormat;
        const material = new THREE.ShaderMaterial({
          uniforms: {
            u_tex: { value: texture },
          },
          vertexShader: `
            varying vec3 v_position;
            void main() {
              v_position = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 v_position;
            uniform sampler3D u_tex;
            void main() {
              vec3 coord = vec3(v_position.x, v_position.y, v_position.z);
              gl_FragColor = texture(u_tex, coord);
            }
          `,
        });
        const cube = new THREE.Mesh(geometry, material);
        this.cube = cube;
        this.scene.add(this.cube);
      });
    },

    loadLabelData() {
      const labelLoader = new THREE.NIFTIReader();
      labelLoader.load(this.labelPath, nifti => {
        const data = nifti.getData();
        const geometry = new THREE.BoxGeometry(nifti.hdr.dims[1], nifti.hdr.dims[2], nifti.hdr.dims[3]);
        const texture = new THREE.DataTexture3D(data, nifti.hdr.dims[1], nifti.hdr.dims[2], nifti.hdr.dims[3]);
        texture.format = THREE.RedFormat;
        const material = new THREE.ShaderMaterial({
          uniforms: {
            u_tex: { value: texture },
          },
          vertexShader: `
            varying vec3 v_position;
            void main() {
              v_position = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            varying vec3 v_position;
            uniform sampler3D u_tex;
            void main() {
              vec3 coord = vec3(v_position.x, v_position.y, v_position.z);
              gl_FragColor = texture(u_tex, coord);
            }
          `,
        });
        const cube = new THREE.Mesh(geometry, material);
        this.labelCube = cube;
        this.labelCube.position.x = nifti.hdr.dims[1] + 1;
        this.scene.add(this.labelCube);
      });
    },

    addViews() {
      const views = [
        {
          left: 0,
          bottom: 0,
          width: 0.5,
          height: 0.5,
          eye: [0, 0, 800],
          up: [0, 1, 0],
          background: new THREE.Color().setRGB(0.5, 0.5, 0.7),
          fov: 45,
        },
        {
          left: 0.5,
          bottom: 0,
          width: 0.5,
          height: 0.5,
          eye: [0, 800, 0],
          up: [0, 0, -1],
          background: new THREE.Color().setRGB(0.7, 0.5, 0.5),
          fov: 45,
        },
        {
          left: 0,
          bottom: 0.5,
          width: 0.5,
          height: 0.5,
          eye: [800, 0, 0],
          up: [0, 0, -1],
          background: new THREE.Color().setRGB(0.7, 0.7, 0.5),
          fov: 45,
        },
      ];
      this.views = views.map(view => {
        const camera = new THREE.PerspectiveCamera(
          view.fov,
          this.$refs.container.offsetWidth / this.$refs.container.offsetHeight,
          0.1,
          1000
        );
        camera.up.fromArray(view.up);
        camera.position.fromArray(view.eye);
        const scene = new THREE.Scene();
        scene.background = view.background;
        scene.add(this.cube.clone());
        scene.add(this.labelCube.clone());
        const _width = this.$refs.container.offsetWidth * view.width;
        const _height = this.$refs.container.offsetHeight * view.height;
        const left = this.$refs.container.offsetWidth * view.left;
        const bottom = this.$refs.container.offsetHeight * view.bottom;
        return {
          left,
          bottom,
          width: _width,
          height: _height,
          camera,
          scene,
        };
      });
      this.currentView = this.views[0];
    },

    animate() {
      requestAnimationFrame(this.animate);
      // 在这里更新和渲染场景
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
      this.labelCube.rotation.x += 0.01;
      this.labelCube.rotation.y += 0.01;

      this.views.forEach(({ left, bottom, width, height, camera, scene }) => {
        this.renderer.setViewport(left, bottom, width, height);
        this.renderer.setScissor(left, bottom, width, height);
        this.renderer.setScissorTest(true);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        this.renderer.render(scene, camera);
      });
    },
  },
};
</script>

<style scoped>

</style>