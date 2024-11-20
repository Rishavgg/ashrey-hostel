from setuptools import setup, find_packages

setup(
    name='facilitator',
    version='1.0.0',  # Initial version of the entire project
    packages=find_packages(),
    install_requires=[
                'asgiref==3.8.1'
                'Django==5.1.1'
                'sqlparse==0.5.1'
                'tzdata==2024.1'
    ],
    include_package_data=True,
)