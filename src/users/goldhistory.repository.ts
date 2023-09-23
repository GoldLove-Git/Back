import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { GoldHistory } from './entities/goldHistory.entity';
import { Repository } from 'typeorm';
import { PointInput } from './dto/pointInput.dto';
import { SignUpDto } from './dto/signup.dto';
