docker_build(
  'ghcr.io/lancewells/loot-loadout/frontend',
  '.',
  only=[
    'src/',
    'public/',
    'package.json',
    'tsconfig.json',
    'yarn.lock'
  ],
  live_update=[
    sync('./', '/app'),
    run('cd /app && yarn install', trigger=['./package.json', './yarn.lock']),
  ]
)

k8s_yaml('./config/frontend.yaml')

k8s_resource(
  'frontend',
  port_forwards=['3001:3000', '9229:9229']
)

k8s_yaml('./config/deployment-db.yaml')

k8s_resource(
  'closet-of-holding-db',
  port_forwards=['5400:5432']
)
