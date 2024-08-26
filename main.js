const GITHUB_PAGES_URL = 'https://inspira-life.github.io/iniciando-projeto';

// Configuração básica da cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.interactive-3d').appendChild(renderer.domElement);

// Adicionando luzes à cena
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 5).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

const fillLight = new THREE.PointLight(0xffffff, 0.5, 50);
fillLight.position.set(-10, 10, -10);
scene.add(fillLight);

// Carregar o modelo 3D
const loader = new THREE.GLTFLoader();
loader.load(`${GITHUB_PAGES_URL}/models/pulmao1.gltf`, function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Ajusta a posição e a escala do modelo
    model.position.set(0, 0.5, 0);
    model.scale.set(1, 1, 1);

    // Função de animação
    function animate() {
        requestAnimationFrame(animate);
        model.rotation.y += 0.01; // Faz o modelo girar no eixo y
        renderer.render(scene, camera);
    }
    animate();
}, undefined, function (error) {
    console.error('Erro ao carregar o modelo:', error);
});

// Configurar a posição da câmera
camera.position.z = 5;

// Atualizar o renderizador no redimensionamento da janela
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
